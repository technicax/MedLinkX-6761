import React, { createContext, useContext, useState, useEffect } from 'react';

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
    // Simulate connection
    const timer = setTimeout(() => {
      setConnected(true);
      
      // Generate default online users
      const defaultUsers = [
        { id: '1', name: 'Dr. Sarah Johnson', status: 'online' },
        { id: '2', name: 'Nurse Mary Smith', status: 'online' },
        { id: '3', name: 'Dr. Michael Brown', status: 'busy' },
        { id: '4', name: 'Emergency Team', status: 'online' },
        { id: '5', name: 'John Wilson', status: 'online' }
      ];
      
      setOnlineUsers(defaultUsers);
    }, 1000);

    // Simulate periodic status updates
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
  }, []);

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