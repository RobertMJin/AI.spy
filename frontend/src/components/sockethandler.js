// src/components/TypingArea.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const TypingArea = () => {
  const [text, setText] = useState('');
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    socket.on('typing', (data) => {
      setTypingUsers((prevUsers) => {
        const userExists = prevUsers.find(user => user.id === data.id);
        if (!userExists) {
          return [...prevUsers, data];
        } else {
          return prevUsers.map(user => user.id === data.id ? data : user);
        }
      });
    });

    return () => {
      socket.off('typing');
    };
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit('typing', { id: socket.id, text: e.target.value });
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <div>
        <h3>Users currently typing:</h3>
        <ul>
          {typingUsers.map(user => (
            <li key={user.id}>{user.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TypingArea;
