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
    const socket = io("http://localhost:5000");
    
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [connectedUsers, setConnectedUsers] = useState([]);

  
    const userInfo =
    isAuthenticated ? {
      name: user.name,
      email: user.email,
      user_id: socket.id
    } : { 
      name: "Guest", 
      email: null, 
      user_id: socket.id
    }


    useEffect(() => {
        socket.connect();
        socket.on('connect', () => {
            setIsReady(true);
            console.log("connected to socket")
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
      }, []);

    // if (!isReady) {
    //     return 'Loading...';
    // }
  
    // if (isLoading) {
    //   return <div>Loading ...</div>;
    // }
  
    return (
        <div className="flex bg-gray-700">
            <div className="flex flex-col items-center mx-16 my-32 w-[40vw]">
                <Profile user={userInfo} connectedUsers={connectedUsers}/>
            </div>
            <div className="flex flex-col justify-center items-center w-[60vw] mx-16 my-16 p-8">
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