import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiPhone, FiPhoneOff, FiVideo, FiVideoOff, 
  FiMic, FiMicOff, FiVolumeX, FiVolume2,
  FiMaximize2, FiMinimize2, FiUsers, FiSettings
} = FiIcons;

const CallWindow = ({ contact, callType, onEndCall }) => {
  const [callStatus, setCallStatus] = useState('connecting'); // connecting, connected, ended
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === 'video');
  const [isSpeakerOn, setIsSpeakerOn] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { addNotification } = useNotification();

  useEffect(() => {
    // Simulate connection process
    const connectTimer = setTimeout(() => {
      setCallStatus('connected');
      addNotification({
        type: 'success',
        title: 'Call Connected',
        message: `${callType === 'video' ? 'Video' : 'Voice'} call with ${contact.name} established`
      });
    }, 3000);

    // Duration timer
    let durationTimer;
    if (callStatus === 'connected') {
      durationTimer = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(connectTimer);
      if (durationTimer) clearInterval(durationTimer);
    };
  }, [callStatus, contact.name, callType, addNotification]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    addNotification({
      type: 'info',
      title: 'Call Ended',
      message: `Call with ${contact.name} ended. Duration: ${formatDuration(duration)}`
    });
    setTimeout(() => onEndCall(), 2000);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    addNotification({
      type: 'info',
      title: isMuted ? 'Microphone Enabled' : 'Microphone Muted',
      message: isMuted ? 'You can now speak' : 'Your microphone is muted'
    });
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
    addNotification({
      type: 'info',
      title: isVideoEnabled ? 'Video Disabled' : 'Video Enabled',
      message: isVideoEnabled ? 'Your camera is off' : 'Your camera is on'
    });
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (callStatus === 'ended') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      >
        <div className="text-center text-white">
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiPhoneOff} className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Call Ended</h2>
          <p className="text-gray-300">Duration: {formatDuration(duration)}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`fixed inset-0 bg-black bg-opacity-95 flex flex-col z-50 ${
        isFullscreen ? 'p-0' : 'p-4'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 text-white">
        <div className="flex items-center space-x-4">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="text-lg font-medium">{contact.name}</h3>
            <p className="text-sm text-gray-300">
              {callStatus === 'connecting' ? 'Connecting...' : formatDuration(duration)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
          >
            <SafeIcon icon={isFullscreen ? FiMinimize2 : FiMaximize2} className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors">
            <SafeIcon icon={FiSettings} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {callType === 'video' && isVideoEnabled ? (
          <div className="h-full relative">
            {/* Remote Video */}
            <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden relative">
              {callStatus === 'connected' ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
                  <div className="text-center text-white">
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <p className="text-lg font-medium">{contact.name}</p>
                    <p className="text-sm opacity-75">Video call in progress</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Local Video (Picture in Picture) */}
            <motion.div
              drag
              dragMomentum={false}
              className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white cursor-move"
            >
              <div className="w-full h-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
                <span className="text-white text-xs">You</span>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Audio Only Interface */
          <div className="h-full flex items-center justify-center">
            <div className="text-center text-white">
              <motion.div
                animate={callStatus === 'connecting' ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-48 h-48 rounded-full mx-auto mb-8 overflow-hidden"
              >
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">{contact.name}</h2>
              <p className="text-xl text-gray-300 mb-4">{contact.role}</p>
              {callStatus === 'connecting' && (
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-lg text-gray-400"
                >
                  Calling...
                </motion.p>
              )}
              {callStatus === 'connected' && (
                <p className="text-lg text-green-400">Connected • {formatDuration(duration)}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="p-6">
        <div className="flex items-center justify-center space-x-6">
          {/* Mute Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMute}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <SafeIcon icon={isMuted ? FiMicOff : FiMic} className="w-6 h-6 text-white" />
          </motion.button>

          {/* Video Toggle (for video calls) */}
          {callType === 'video' && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleVideo}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                !isVideoEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              <SafeIcon icon={isVideoEnabled ? FiVideo : FiVideoOff} className="w-6 h-6 text-white" />
            </motion.button>
          )}

          {/* End Call Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleEndCall}
            className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
          >
            <SafeIcon icon={FiPhoneOff} className="w-7 h-7 text-white" />
          </motion.button>

          {/* Speaker Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSpeaker}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
              isSpeakerOn ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'
            }`}
          >
            <SafeIcon icon={isSpeakerOn ? FiVolume2 : FiVolumeX} className="w-6 h-6 text-white" />
          </motion.button>

          {/* Add Participant (for group calls) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
          >
            <SafeIcon icon={FiUsers} className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center justify-center space-x-6 mt-4 text-sm text-gray-400">
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${isMuted ? 'bg-red-500' : 'bg-green-500'}`}></div>
            <span>{isMuted ? 'Muted' : 'Mic On'}</span>
          </div>
          {callType === 'video' && (
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${!isVideoEnabled ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span>{isVideoEnabled ? 'Camera On' : 'Camera Off'}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${callStatus === 'connected' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span>{callStatus === 'connected' ? 'Connected' : 'Connecting'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CallWindow;