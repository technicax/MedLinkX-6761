import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch, FiMoreVertical } = FiIcons;

const MessageList = ({ selectedContact, onSelectContact }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Dr. Michael Brown',
      role: 'Cardiologist',
      lastMessage: 'Patient in room 204 needs immediate attention',
      time: '2 min ago',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      online: true,
      lastSeen: 'Active now'
    },
    {
      id: 2,
      name: 'Nurse Mary Smith',
      role: 'ICU Nurse',
      lastMessage: 'Medication schedule updated for patient #1234',
      time: '15 min ago',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1594824475317-8b6b6d1a11a4?w=150&h=150&fit=crop&crop=face',
      online: true,
      lastSeen: 'Active now'
    },
    {
      id: 3,
      name: 'Dr. Lisa Chen',
      role: 'Neurologist',
      lastMessage: 'MRI results are ready for review',
      time: '1 hour ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      online: false,
      lastSeen: '2 hours ago'
    },
    {
      id: 4,
      name: 'Emergency Team',
      role: 'Group Chat',
      lastMessage: 'All clear - emergency resolved',
      time: '2 hours ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      online: true,
      lastSeen: 'Active now'
    },
    {
      id: 5,
      name: 'Dr. Robert Wilson',
      role: 'Surgeon',
      lastMessage: 'Surgery scheduled for tomorrow at 8 AM',
      time: '3 hours ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      online: false,
      lastSeen: '1 hour ago'
    },
    {
      id: 6,
      name: 'Pharmacy Team',
      role: 'Group Chat',
      lastMessage: 'New medication stock arrived',
      time: '4 hours ago',
      unread: 3,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      online: true,
      lastSeen: 'Active now'
    }
  ];

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unread, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
          {totalUnread > 0 && (
            <span className="bg-blue-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {totalUnread} unread
            </span>
          )}
        </div>
        
        <div className="relative">
          <SafeIcon 
            icon={FiSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation, index) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectContact(conversation)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedContact?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative flex-shrink-0">
                <img
                  src={conversation.avatar}
                  alt={conversation.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {conversation.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {conversation.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{conversation.time}</span>
                    <button className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all">
                      <SafeIcon icon={FiMoreVertical} className="w-3 h-3 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mt-1">{conversation.role}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-600 truncate flex-1 mr-2">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredConversations.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;