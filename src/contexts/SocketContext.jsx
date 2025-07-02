import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNotification } from './NotificationContext';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setConnected(true);
      setOnlineUsers([
        { id: '1', name: 'Dr. Sarah Johnson', status: 'online' },
        { id: '2', name: 'Nurse Mary Smith', status: 'online' },
        { id: '3', name: 'Dr. Michael Brown', status: 'busy' },
      ]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (message) => {
    console.log('Sending message:', message);
    return Promise.resolve();
  };

  const value = {
    connected,
    onlineUsers,
    sendMessage
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};