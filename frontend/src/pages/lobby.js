import React from 'react'
import { useState, useRef , useEffect } from 'react'
import LobbyProfile from '../components/lobbyProfile'
import Canvas from '../components/game/canvas'
import Profile from '../components/game/profile'
import io from "socket.io-client";

import { useAuth0 } from "@auth0/auth0-react";


const Lobby = () => {
    const [numPlayers, setNumPlayers] = useState(1);
    const [isReady, setIsReady] = useState(false);
    const [userInfo, setUserInfo] = useState(
      {name: "Guest", 
      email: null,
      userid: 'fake_id'});
    const socket = io("127.0.0.1:5000");
    
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [connectedUsers, setConnectedUsers] = useState([]);

    isAuthenticated && setUserInfo({
        name: user.name,
        email: user.email,
        userid: 'fakeid'
      });

    // this is correct
    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            setIsReady(true);
            console.log("connected to socket: " + socket.id);
            setUserInfo({name: userInfo.name, email: userInfo.email, userid: socket.id});
            console.log("user info socket id: " + userInfo.userid);
        });
        return () => {
            socket.disconnect();
            socket.close();
            setIsReady(false);
            console.log("disconnected from socket")
        };
    }, []);
    

    useEffect(() => {
          if (isAuthenticated) {
            socket.emit("userConnect", userInfo);
            console.log("emitted after being authenticated");
          } else {
            socket.emit("userConnect", userInfo);
            console.log("emitted as guest");
          }
      
          socket.on("usersconnected", connectedUser => {
            setConnectedUsers((prevUsers) => [...prevUsers, connectedUser]);
            console.log("connected user: ", connectedUser);
          });
      
          
          socket.on("usersdisconnected", disconnectedUser => {
            setConnectedUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== disconnectedUser.user_id));
            console.log("disconnected user: ", disconnectedUser);
          });
      
          return () => {
            socket.emit("userDisconnect", userInfo);
            socket.off("usersconnected");
            socket.off("usersdisconneted");
          };
      }, [isAuthenticated, userInfo]);
    

    // if (!isReady) {
    //     return 'Loading...';
    // }
  
    // if (isLoading) {
    //   return <div>Loading ...</div>;
    // }
  
    return (
        <div className="flex bg-gray-700">
            <div className="flex flex-col items-center mx-16 my-8 w-[40vw]">
                <Profile user={userInfo} connectedUsers={connectedUsers}/>
            </div>
            <div className="flex flex-col justify-center items-center w-[60vw] mx-16 my-8 p-8">
                <Canvas canvasSize={640} />
                <div className="flex">
                    <button className="m-4 text-white">Invite</button>
                    <button className="m-4 text-white">Start</button>
                </div>
            </div>
        </div>
    )
}

export default Lobby