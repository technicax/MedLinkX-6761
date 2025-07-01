import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MessageList from './MessageList';
import ChatWindow from './ChatWindow';
import ContactList from './ContactList';

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [activeTab, setActiveTab] = useState('conversations');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">Messages</h1>
            
            <div className="flex mt-3 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('conversations')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'conversations'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Conversations
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === 'contacts'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Contacts
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'conversations' ? (
              <MessageList 
                selectedContact={selectedContact}
                onSelectContact={setSelectedContact}
              />
            ) : (
              <ContactList 
                onSelectContact={(contact) => {
                  setSelectedContact(contact);
                  setActiveTab('conversations');
                }}
              />
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <ChatWindow contact={selectedContact} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a contact to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;