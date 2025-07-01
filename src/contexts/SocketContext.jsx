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
  const { addNotification } = useNotification();

  useEffect(() => {
    // Simulate WebSocket connection
    const timer = setTimeout(() => {
      setConnected(true);
      setOnlineUsers([
        { id: '1', name: 'Dr. Sarah Johnson', status: 'online' },
        { id: '2', name: 'Nurse Mary Smith', status: 'online' },
        { id: '3', name: 'Dr. Michael Brown', status: 'busy' },
      ]);
    }, 1000);

    // Simulate real-time notifications
    const notificationTimer = setInterval(() => {
      const notifications = [
        { type: 'info', title: 'New Lab Result', message: 'Patient #1234 - Blood work complete' },
        { type: 'warning', title: 'Medication Alert', message: 'Patient #5678 - Check drug interactions' },
        { type: 'success', title: 'Discharge Ready', message: 'Patient #9012 cleared for discharge' },
      ];
      
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        addNotification(randomNotification);
      }
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearInterval(notificationTimer);
    };
  }, [addNotification]);

  const sendMessage = (message) => {
    // Simulate sending message
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