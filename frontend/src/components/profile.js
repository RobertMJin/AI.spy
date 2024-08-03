import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Update with backend URL

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [connectedUsers, setConnectedUsers] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      socket.emit("authenticate", {
        name: user.name,
        email: user.email,
        user_id: user.sub
      });
    }

    socket.on("user_authenticated", (userInfo) => {
      setConnectedUsers((prevUsers) => [...prevUsers, userInfo]);
    });

    socket.on("connected", (message) => {
      console.log(message);
    });

    socket.on("disconnected", (message) => {
      console.log(message);
    });

    return () => {
      socket.off("user_authenticated");
      socket.off("connected");
      socket.off("disconnected");
    };
  }, [isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
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
