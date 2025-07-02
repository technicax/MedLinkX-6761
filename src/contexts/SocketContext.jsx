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
  const [hasShownConnectedNotification, setHasShownConnectedNotification] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    // Check if we've already shown the notification in this session
    const hasShownNotification = sessionStorage.getItem('socket_connected_notification');
    
    // Simulate connection
    const timer = setTimeout(() => {
      setConnected(true);
      setOnlineUsers([
        { id: '1', name: 'Dr. Sarah Johnson', status: 'online' },
        { id: '2', name: 'Nurse Mary Smith', status: 'online' },
        { id: '3', name: 'Dr. Michael Brown', status: 'busy' },
        { id: '4', name: 'Emergency Team', status: 'online' },
        { id: '5', name: 'John Wilson', status: 'online' }
      ]);

      // Only show notification if we haven't shown it before in this session
      if (!hasShownNotification && !hasShownConnectedNotification) {
        addNotification({
          type: 'success',
          title: 'Connected',
          message: 'Real-time messaging and calling is now active'
        });
        setHasShownConnectedNotification(true);
        sessionStorage.setItem('socket_connected_notification', 'true');
      }
    }, 1000);

    // Simulate periodic status updates (without notifications)
    const statusTimer = setInterval(() => {
      setOnlineUsers(prev => prev.map(user => ({
        ...user,
        status: Math.random() > 0.8 ? 'busy' : 'online'
      })));
    }, 30000);

    return () => {
      clearTimeout(timer);
      clearInterval(statusTimer);
    };
  }, []); // Remove addNotification from dependencies to prevent re-running

  const sendMessage = async (message) => {
    console.log('Sending message:', message);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate success/failure
    if (Math.random() > 0.1) { // 90% success rate
      return Promise.resolve({
        id: Date.now(),
        ...message,
        timestamp: new Date(),
        status: 'sent'
      });
    } else {
      throw new Error('Failed to send message');
    }
  };

  const initiateCall = async (contact, callType) => {
    console.log(`Initiating ${callType} call with:`, contact);
    // Simulate call setup delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return Promise.resolve({
      id: Date.now(),
      contact,
      callType,
      status: 'connecting',
      timestamp: new Date()
    });
  };

  const value = {
    connected,
    onlineUsers,
    sendMessage,
    initiateCall
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};