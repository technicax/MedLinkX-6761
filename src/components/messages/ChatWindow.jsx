import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import CallWindow from './CallWindow';
import IncomingCallModal from './IncomingCallModal';
import MediaRecorder from './MediaRecorder';
import FileAttachment from './FileAttachment';
import MessageBubble from './MessageBubble';
import { useSocket } from '../../contexts/SocketContext';
import { useRBAC } from '../../contexts/RBACContext';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiSend, FiPaperclip, FiPhone, FiVideo, 
  FiMoreVertical, FiSmile, FiMic, FiCamera 
} = FiIcons;

const ChatWindow = ({ contact }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [activeCall, setActiveCall] = useState(null);
  const [incomingCall, setIncomingCall] = useState(null);
  const [showMediaRecorder, setShowMediaRecorder] = useState(null);
  const [showFileAttachment, setShowFileAttachment] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  
  const messagesEndRef = useRef(null);
  const { sendMessage } = useSocket();
  const { currentUser } = useRBAC();
  const { addNotification } = useNotification();

  // Mock messages with different types
  const mockMessages = [
    {
      id: 1,
      text: 'Patient in room 204 needs immediate attention',
      sender: contact.id,
      timestamp: new Date(Date.now() - 1200000),
      type: 'text',
      status: 'delivered'
    },
    {
      id: 2,
      text: 'On my way, what\'s the situation?',
      sender: 'me',
      timestamp: new Date(Date.now() - 600000),
      type: 'text',
      status: 'read'
    },
    {
      id: 3,
      sender: contact.id,
      timestamp: new Date(Date.now() - 500000),
      type: 'voice',
      duration: 45,
      url: '/mock-audio.webm',
      status: 'delivered'
    },
    {
      id: 4,
      sender: 'me',
      timestamp: new Date(Date.now() - 400000),
      type: 'image',
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      status: 'read'
    },
    {
      id: 5,
      text: 'Here are the latest lab results',
      sender: contact.id,
      timestamp: new Date(Date.now() - 300000),
      type: 'file',
      fileName: 'lab_results_patient_204.pdf',
      fileSize: 2456789,
      fileType: 'document',
      url: '/mock-file.pdf',
      status: 'delivered'
    }
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, [contact.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate incoming calls randomly
  useEffect(() => {
    const callTimer = setTimeout(() => {
      if (Math.random() > 0.8 && !activeCall && !incomingCall) {
        setIncomingCall({
          caller: contact,
          callType: Math.random() > 0.5 ? 'video' : 'voice'
        });
      }
    }, 15000);

    return () => clearTimeout(callTimer);
  }, [contact, activeCall, incomingCall]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: 'me',
      timestamp: new Date(),
      type: 'text',
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    try {
      await sendMessage({
        to: contact.id,
        text: message,
        type: 'text'
      });

      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);

      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        ));
      }, 2000);

    } catch (error) {
      console.error('Failed to send message:', error);
      addNotification({
        type: 'error',
        title: 'Message Failed',
        message: 'Failed to send message. Please try again.'
      });
    }
  };

  const handleMediaSend = (mediaData) => {
    const newMessage = {
      id: Date.now(),
      sender: 'me',
      timestamp: new Date(),
      type: mediaData.type,
      url: mediaData.url,
      duration: mediaData.duration,
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setShowMediaRecorder(null);

    addNotification({
      type: 'success',
      title: 'Media Sent',
      message: `${mediaData.type === 'video' ? 'Video' : 'Voice'} message sent successfully`
    });

    // Simulate status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);
  };

  const handleFileAttach = (files) => {
    if (files.length === 1) {
      const file = files[0];
      const newMessage = {
        id: Date.now(),
        sender: 'me',
        timestamp: new Date(),
        type: file.type === 'image' ? 'image' : 'file',
        url: file.url,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        status: 'sending'
      };

      setMessages(prev => [...prev, newMessage]);
    } else {
      // Multiple files
      const newMessage = {
        id: Date.now(),
        sender: 'me',
        timestamp: new Date(),
        type: 'files',
        files: files,
        status: 'sending'
      };

      setMessages(prev => [...prev, newMessage]);
    }

    setShowFileAttachment(false);
    setShowAttachmentMenu(false);

    addNotification({
      type: 'success',
      title: 'Files Attached',
      message: `${files.length} file(s) sent successfully`
    });
  };

  const handleVideoCall = () => {
    setActiveCall({ contact, callType: 'video' });
    addNotification({
      type: 'info',
      title: 'Video Call Started',
      message: `Starting video call with ${contact.name}...`
    });
  };

  const handleVoiceCall = () => {
    setActiveCall({ contact, callType: 'voice' });
    addNotification({
      type: 'info',
      title: 'Voice Call Started',
      message: `Calling ${contact.name}...`
    });
  };

  const handleEndCall = () => {
    setActiveCall(null);
  };

  const handleAcceptIncomingCall = () => {
    setActiveCall({
      contact: incomingCall.caller,
      callType: incomingCall.callType
    });
    setIncomingCall(null);
  };

  const handleRejectIncomingCall = () => {
    setIncomingCall(null);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-600">
                  {contact.online ? 'Active now' : `Last seen ${contact.lastSeen || '2 hours ago'}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVoiceCall}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Voice Call"
              >
                <SafeIcon icon={FiPhone} className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVideoCall}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                title="Video Call"
              >
                <SafeIcon icon={FiVideo} className="w-5 h-5 text-gray-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SafeIcon icon={FiMoreVertical} className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isOwn={msg.sender === 'me'}
            />
          ))}

          {/* Typing Indicator */}
          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-2">
                <div className="flex items-center space-x-1">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">{contact.name} is typing...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <form onSubmit={handleSendMessage} className="flex items-end space-x-3">
            {/* Attachment Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <SafeIcon icon={FiPaperclip} className="w-5 h-5 text-gray-600" />
              </motion.button>

              <AnimatePresence>
                {showAttachmentMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2"
                  >
                    <button
                      onClick={() => {
                        setShowFileAttachment(true);
                        setShowAttachmentMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiPaperclip} className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Files</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowMediaRecorder('audio');
                        setShowAttachmentMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiMic} className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Voice</span>
                    </button>
                    
                    <button
                      onClick={() => {
                        setShowMediaRecorder('video');
                        setShowAttachmentMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <SafeIcon icon={FiCamera} className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Video</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${contact.name}...`}
                className="w-full px-4 py-3 bg-gray-100 border-0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <SafeIcon icon={FiSmile} className="w-5 h-5 text-gray-600" />
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!message.trim()}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SafeIcon icon={FiSend} className="w-5 h-5" />
            </motion.button>
          </form>
        </div>
      </div>

      {/* Modals and Overlays */}
      <AnimatePresence>
        {activeCall && (
          <CallWindow
            contact={activeCall.contact}
            callType={activeCall.callType}
            onEndCall={handleEndCall}
          />
        )}
        
        {incomingCall && (
          <IncomingCallModal
            caller={incomingCall.caller}
            callType={incomingCall.callType}
            onAccept={handleAcceptIncomingCall}
            onReject={handleRejectIncomingCall}
          />
        )}

        {showMediaRecorder && (
          <MediaRecorder
            type={showMediaRecorder}
            onSend={handleMediaSend}
            onCancel={() => setShowMediaRecorder(null)}
          />
        )}

        {showFileAttachment && (
          <FileAttachment
            onAttach={handleFileAttach}
            onCancel={() => setShowFileAttachment(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWindow;