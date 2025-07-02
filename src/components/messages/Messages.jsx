import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MessageList from './MessageList';
import ChatWindow from './ChatWindow';
import ContactList from './ContactList';

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeView, setActiveView] = useState('conversations');

  const handleViewChange = (viewId) => {
    setActiveView(viewId);
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    if (activeView === 'contacts') {
      setActiveView('conversations');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)]"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleViewChange('conversations')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'conversations'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Conversations
          </button>
          <button
            onClick={() => handleViewChange('contacts')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeView === 'contacts'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Contacts
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Left Panel - Message List or Contact List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {activeView === 'conversations' ? (
            <MessageList
              selectedContact={selectedContact}
              onSelectContact={handleSelectContact}
            />
          ) : (
            <ContactList
              onSelectContact={handleSelectContact}
            />
          )}
        </div>

        {/* Right Panel - Chat Window */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {selectedContact ? (
            <ChatWindow contact={selectedContact} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a conversation
                </h3>
                <p className="text-gray-600">
                  Choose a contact or conversation to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;