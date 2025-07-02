import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiMic, FiMicOff, FiVideo, FiVideoOff, 
  FiPlay, FiPause, FiSquare, FiSend, 
  FiX, FiRefreshCw 
} = FiIcons;

const MediaRecorder = ({ type, onSend, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [mediaBlob, setMediaBlob] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const durationTimerRef = useRef(null);
  
  const { addNotification } = useNotification();

  useEffect(() => {
    return () => {
      stopRecording();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const constraints = type === 'video' 
        ? { video: true, audio: true }
        : { audio: true };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (type === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { 
          type: type === 'video' ? 'video/webm' : 'audio/webm' 
        });
        setMediaBlob(blob);
        setMediaUrl(URL.createObjectURL(blob));
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setDuration(0);
      
      // Start duration timer
      durationTimerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
      
      addNotification({
        type: 'info',
        title: 'Recording Started',
        message: `${type === 'video' ? 'Video' : 'Voice'} recording in progress`
      });
      
    } catch (error) {
      console.error('Error starting recording:', error);
      addNotification({
        type: 'error',
        title: 'Recording Failed',
        message: 'Unable to access camera/microphone'
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      clearInterval(durationTimerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      durationTimerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      clearInterval(durationTimerRef.current);
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    }
  };

  const playPreview = () => {
    if (type === 'video' && videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    } else if (type === 'audio' && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pausePreview = () => {
    if (type === 'video' && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else if (type === 'audio' && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSend = () => {
    if (mediaBlob) {
      onSend({
        type: type,
        blob: mediaBlob,
        url: mediaUrl,
        duration: duration
      });
    }
  };

  const handleRetake = () => {
    setMediaBlob(null);
    setMediaUrl(null);
    setDuration(0);
    setIsPlaying(false);
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            {type === 'video' ? 'Video' : 'Voice'} Message
          </h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Recording Area */}
        <div className="mb-6">
          {type === 'video' ? (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                muted={isRecording}
                src={mediaUrl}
                className="w-full h-48 bg-gray-900 rounded-lg object-cover"
                onEnded={() => setIsPlaying(false)}
              />
              {!isRecording && !mediaBlob && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-lg">
                  <SafeIcon icon={FiVideo} className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
          ) : (
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center relative">
              {mediaUrl && (
                <audio
                  ref={audioRef}
                  src={mediaUrl}
                  onEnded={() => setIsPlaying(false)}
                />
              )}
              <div className="text-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                  isRecording ? 'bg-red-500 animate-pulse' : 'bg-blue-500'
                }`}>
                  <SafeIcon 
                    icon={isRecording ? FiMic : FiMicOff} 
                    className="w-8 h-8 text-white" 
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {isRecording ? 'Recording...' : 'Voice Message'}
                </p>
              </div>
              
              {/* Audio Waveform Visualization */}
              {isRecording && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-1">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [4, 20, 4] }}
                      transition={{
                        duration: 0.5,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                      className="w-1 bg-blue-500 rounded-full"
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Duration Display */}
        <div className="text-center mb-6">
          <span className="text-2xl font-mono text-gray-900">
            {formatDuration(duration)}
          </span>
          {isPaused && (
            <span className="ml-2 text-sm text-yellow-600">PAUSED</span>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          {!mediaBlob ? (
            // Recording Controls
            <>
              {!isRecording ? (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={startRecording}
                  className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <SafeIcon icon={type === 'video' ? FiVideo : FiMic} className="w-6 h-6 text-white" />
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={isPaused ? resumeRecording : pauseRecording}
                    className="w-12 h-12 bg-yellow-600 hover:bg-yellow-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <SafeIcon icon={isPaused ? FiPlay : FiPause} className="w-5 h-5 text-white" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={stopRecording}
                    className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-colors"
                  >
                    <SafeIcon icon={FiSquare} className="w-6 h-6 text-white" />
                  </motion.button>
                </>
              )}
            </>
          ) : (
            // Preview Controls
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleRetake}
                className="w-12 h-12 bg-gray-600 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                <SafeIcon icon={FiRefreshCw} className="w-5 h-5 text-white" />
              </motion.button>
              
              {type === 'audio' && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={isPlaying ? pausePreview : playPreview}
                  className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="w-5 h-5 text-white" />
                </motion.button>
              )}
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors"
              >
                <SafeIcon icon={FiSend} className="w-6 h-6 text-white" />
              </motion.button>
            </>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            {!mediaBlob 
              ? `Tap ${isRecording ? 'stop' : 'record'} to ${isRecording ? 'finish' : 'start'} ${type} message`
              : 'Preview your message and tap send when ready'
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaRecorder;