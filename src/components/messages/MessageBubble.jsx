import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { 
  FiPlay, FiPause, FiDownload, FiEye, 
  FiFile, FiImage, FiVideo, FiMusic 
} = FiIcons;

const MessageBubble = ({ message, isOwn }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case 'sending':
        return '⏳';
      case 'delivered':
        return '✓';
      case 'read':
        return '✓✓';
      default:
        return '';
    }
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'image': return FiImage;
      case 'video': return FiVideo;
      case 'audio': return FiMusic;
      case 'document': return FiFile;
      default: return FiFile;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderTextMessage = () => (
    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
      isOwn
        ? 'bg-blue-600 text-white rounded-br-sm'
        : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
    }`}>
      <p className="text-sm">{message.text}</p>
      <div className={`flex items-center justify-between mt-1 text-xs ${
        isOwn ? 'text-blue-100' : 'text-gray-500'
      }`}>
        <span>{formatTime(message.timestamp)}</span>
        {isOwn && (
          <span className="ml-2">{getMessageStatus(message.status)}</span>
        )}
      </div>
    </div>
  );

  const renderVoiceMessage = () => (
    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
      isOwn
        ? 'bg-blue-600 text-white rounded-br-sm'
        : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
    }`}>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isOwn ? 'bg-blue-500' : 'bg-gray-100'
          }`}
        >
          <SafeIcon 
            icon={isPlaying ? FiPause : FiPlay} 
            className={`w-4 h-4 ${isOwn ? 'text-white' : 'text-gray-600'}`} 
          />
        </button>
        
        <div className="flex-1">
          {/* Audio Waveform */}
          <div className="flex items-center space-x-1 mb-1">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all ${
                  i < (currentTime / duration) * 20
                    ? isOwn ? 'bg-blue-200' : 'bg-blue-500'
                    : isOwn ? 'bg-blue-400' : 'bg-gray-300'
                }`}
                style={{ 
                  height: `${Math.random() * 16 + 8}px`
                }}
              />
            ))}
          </div>
          
          <div className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
            {formatDuration(message.duration || 0)}
          </div>
        </div>
      </div>
      
      <div className={`flex items-center justify-between mt-2 text-xs ${
        isOwn ? 'text-blue-100' : 'text-gray-500'
      }`}>
        <span>{formatTime(message.timestamp)}</span>
        {isOwn && (
          <span className="ml-2">{getMessageStatus(message.status)}</span>
        )}
      </div>
    </div>
  );

  const renderVideoMessage = () => (
    <div className={`max-w-sm rounded-2xl overflow-hidden ${
      isOwn ? 'rounded-br-sm' : 'rounded-bl-sm'
    }`}>
      <div className="relative">
        <video
          src={message.url}
          poster={message.thumbnail}
          className="w-full h-48 object-cover bg-gray-900"
          controls
        />
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
          {formatDuration(message.duration || 0)}
        </div>
      </div>
      
      <div className={`px-3 py-2 ${
        isOwn ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border-t border-gray-200'
      }`}>
        <div className={`flex items-center justify-between text-xs ${
          isOwn ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span>{formatTime(message.timestamp)}</span>
          {isOwn && (
            <span className="ml-2">{getMessageStatus(message.status)}</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderImageMessage = () => (
    <div className={`max-w-sm rounded-2xl overflow-hidden ${
      isOwn ? 'rounded-br-sm' : 'rounded-bl-sm'
    }`}>
      <img
        src={message.url}
        alt="Shared image"
        className="w-full h-48 object-cover cursor-pointer"
        onClick={() => window.open(message.url, '_blank')}
      />
      
      <div className={`px-3 py-2 ${
        isOwn ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border-t border-gray-200'
      }`}>
        <div className={`flex items-center justify-between text-xs ${
          isOwn ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span>{formatTime(message.timestamp)}</span>
          {isOwn && (
            <span className="ml-2">{getMessageStatus(message.status)}</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderFileMessage = () => (
    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
      isOwn
        ? 'bg-blue-600 text-white rounded-br-sm'
        : 'bg-white text-gray-900 rounded-bl-sm border border-gray-200'
    }`}>
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
          isOwn ? 'bg-blue-500' : 'bg-gray-100'
        }`}>
          <SafeIcon 
            icon={getFileIcon(message.fileType)} 
            className={`w-6 h-6 ${isOwn ? 'text-white' : 'text-gray-600'}`} 
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium truncate ${
            isOwn ? 'text-white' : 'text-gray-900'
          }`}>
            {message.fileName}
          </p>
          <p className={`text-xs ${isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
            {formatFileSize(message.fileSize)}
          </p>
        </div>
        
        <button
          onClick={() => window.open(message.url, '_blank')}
          className={`p-2 rounded-lg transition-colors ${
            isOwn 
              ? 'hover:bg-blue-500' 
              : 'hover:bg-gray-100'
          }`}
        >
          <SafeIcon 
            icon={FiDownload} 
            className={`w-4 h-4 ${isOwn ? 'text-white' : 'text-gray-600'}`} 
          />
        </button>
      </div>
      
      <div className={`flex items-center justify-between mt-2 text-xs ${
        isOwn ? 'text-blue-100' : 'text-gray-500'
      }`}>
        <span>{formatTime(message.timestamp)}</span>
        {isOwn && (
          <span className="ml-2">{getMessageStatus(message.status)}</span>
        )}
      </div>
    </div>
  );

  const renderMultipleFiles = () => (
    <div className={`max-w-sm rounded-2xl overflow-hidden ${
      isOwn ? 'rounded-br-sm' : 'rounded-bl-sm'
    }`}>
      <div className="space-y-2 p-3 bg-gray-50">
        {message.files.slice(0, 3).map((file, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 bg-white rounded-lg">
            <SafeIcon 
              icon={getFileIcon(file.type)} 
              className="w-4 h-4 text-gray-600" 
            />
            <span className="text-xs text-gray-900 truncate flex-1">
              {file.name}
            </span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <SafeIcon icon={FiDownload} className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        ))}
        
        {message.files.length > 3 && (
          <div className="text-center text-xs text-gray-500 py-1">
            +{message.files.length - 3} more files
          </div>
        )}
      </div>
      
      <div className={`px-3 py-2 ${
        isOwn ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border-t border-gray-200'
      }`}>
        <div className={`flex items-center justify-between text-xs ${
          isOwn ? 'text-blue-100' : 'text-gray-500'
        }`}>
          <span>{formatTime(message.timestamp)}</span>
          {isOwn && (
            <span className="ml-2">{getMessageStatus(message.status)}</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderMessage = () => {
    switch (message.type) {
      case 'voice':
        return renderVoiceMessage();
      case 'video':
        return renderVideoMessage();
      case 'image':
        return renderImageMessage();
      case 'file':
        return renderFileMessage();
      case 'files':
        return renderMultipleFiles();
      default:
        return renderTextMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      {renderMessage()}
    </motion.div>
  );
};

export default MessageBubble;