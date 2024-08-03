import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Update with backend URL
const crypto = require("crypto");


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [connectedUsers, setConnectedUsers] = useState([]);
  let uuid = crypto.randomUUID();

  const userInfo = {
    name: user.name,
    email: user.email,
    user_id: user.user_id
  };

  useEffect(() => {
    if (isAuthenticated) {
      socket.emit("connect", userInfo);
      console.log("emitted after being authenticated");
    } else {
      socket.emit("connect", { name: "Guest", email: null, user_id: `guest-${uuid}`});
      console.log("emitted after not being authenticated");
    }

    socket.on("usersconnected", connectedUser => {
      setConnectedUsers((prevUsers) => [...prevUsers, connectedUser]);
      console.log("connected user: ", connectedUser);
    });

    if (isAuthenticated) {
      socket.emit("disconnect", userInfo);
    } else {
      socket.emit("disconnect", { name: "Guest", email: null, user_id: `guest-${uuid}`});
    }
    
    socket.on("usersdisconnected", disconnectedUser => {
      setConnectedUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== disconnectedUser.user_id));
      console.log("disconnected user: ", disconnectedUser);
    });

    return () => {
      socket.off("connected");
      socket.off("disconnected");
    };
  }, [onJoinButton, onLeaveButton]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <div>
          <img src={user.picture} alt={user.name} />
          <h2 className="font-bold">You</h2>
          <p>{user.email}</p>
        </div>
        <div>
          <h3>Connected Users:</h3>
          <ul>
            {connectedUsers.map((user) => (
              <li key={user.user_id}>
                {user.username} ({user.email})
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default Profile;
