import React, { useEffect, useState } from "react";
import LobbyProfile from "../lobbyProfile.js";

const Profile = ({ user, connectedUsers }) => {
  
  return (
    (
      <div>
        <div>
          <img src={user.picture} alt={user.name} />
          <h2 className="font-bold">You</h2>
          <p>{user.email}</p>
        </div>
        <div>
          <h3>Connected Users:</h3>
          <ul>
            {connectedUsers.map((connectedUser) => (
              <LobbyProfile key={user.id} user={connectedUser} />
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default Profile;
