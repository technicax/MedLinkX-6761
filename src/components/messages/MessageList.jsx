import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSearch } = FiIcons;

const MessageList = ({ selectedContact, onSelectContact }) => {
  const conversations = [
    {
      id: 1,
      name: 'Dr. Michael Brown',
      role: 'Cardiologist',
      lastMessage: 'Patient in room 204 needs immediate attention',
      time: '2 min ago',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      online: true
    },
    {
      id: 2,
      name: 'Nurse Mary Smith',
      role: 'ICU Nurse',
      lastMessage: 'Medication schedule updated for patient #1234',
      time: '15 min ago',
      unread: 1,
      avatar: 'https://images.unsplash.com/photo-1594824475317-8b6b6d1a11a4?w=150&h=150&fit=crop&crop=face',
      online: true
    },
    {
      id: 3,
      name: 'Dr. Lisa Chen',
      role: 'Neurologist',
      lastMessage: 'MRI results are ready for review',
      time: '1 hour ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      online: false
    },
    {
      id: 4,
      name: 'Emergency Team',
      role: 'Group Chat',
      lastMessage: 'All clear - emergency resolved',
      time: '2 hours ago',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      online: true
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <div className="relative">
          <SafeIcon icon={FiSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation, index) => (
          <motion.div
            key={conversation.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectContact(conversation)}
            className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              selectedContact?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
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
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                
                <p className="text-xs text-gray-600 mt-1">{conversation.role}</p>
                
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-600 truncate flex-1">
                    {conversation.lastMessage}
                  </p>
                  {conversation.unread > 0 && (
                    <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;