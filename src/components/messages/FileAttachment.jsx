import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import { useNotification } from '../../contexts/NotificationContext';
import * as FiIcons from 'react-icons/fi';

const { 
  FiUpload, FiFile, FiImage, FiVideo, FiMusic,
  FiX, FiCheck, FiTrash2, FiEye, FiDownload
} = FiIcons;

const FileAttachment = ({ onAttach, onCancel }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);
  const { addNotification } = useNotification();

  const maxFileSize = 50 * 1024 * 1024; // 50MB
  const allowedTypes = {
    image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    video: ['video/mp4', 'video/webm', 'video/quicktime'],
    audio: ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/m4a'],
    document: [
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain', 'text/csv'
    ]
  };

  const getFileType = (file) => {
    if (allowedTypes.image.includes(file.type)) return 'image';
    if (allowedTypes.video.includes(file.type)) return 'video';
    if (allowedTypes.audio.includes(file.type)) return 'audio';
    if (allowedTypes.document.includes(file.type)) return 'document';
    return 'other';
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

  const validateFile = (file) => {
    if (file.size > maxFileSize) {
      addNotification({
        type: 'error',
        title: 'File Too Large',
        message: `${file.name} exceeds 50MB limit`
      });
      return false;
    }

    const allAllowedTypes = [
      ...allowedTypes.image,
      ...allowedTypes.video,
      ...allowedTypes.audio,
      ...allowedTypes.document
    ];

    if (!allAllowedTypes.includes(file.type)) {
      addNotification({
        type: 'error',
        title: 'Invalid File Type',
        message: `${file.name} is not a supported file type`
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = (files) => {
    const validFiles = Array.from(files).filter(validateFile);
    
    const fileObjects = validFiles.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: getFileType(file),
      url: URL.createObjectURL(file),
      preview: getFileType(file) === 'image' ? URL.createObjectURL(file) : null
    }));

    setSelectedFiles(prev => [...prev, ...fileObjects]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    handleFileSelect(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeFile = (fileId) => {
    setSelectedFiles(prev => {
      const updated = prev.filter(f => f.id !== fileId);
      // Clean up object URLs
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return updated;
    });
  };

  const handleSend = () => {
    if (selectedFiles.length > 0) {
      onAttach(selectedFiles);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Attach Files</h3>
          <button
            onClick={onCancel}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 transition-colors cursor-pointer ${
            dragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <SafeIcon icon={FiUpload} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            {dragOver ? 'Drop files here' : 'Choose files or drag here'}
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Support for images, videos, audio, and documents up to 50MB
          </p>
          
          {/* Quick Action Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.setAttribute('accept', 'image/*');
                fileInputRef.current.click();
              }}
              className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <SafeIcon icon={FiImage} className="w-4 h-4" />
              <span className="text-sm">Images</span>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.setAttribute('accept', 'video/*');
                fileInputRef.current.click();
              }}
              className="flex items-center space-x-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
            >
              <SafeIcon icon={FiVideo} className="w-4 h-4" />
              <span className="text-sm">Videos</span>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.setAttribute('accept', '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv');
                fileInputRef.current.click();
              }}
              className="flex items-center space-x-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
            >
              <SafeIcon icon={FiFile} className="w-4 h-4" />
              <span className="text-sm">Documents</span>
            </button>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </div>

        {/* Selected Files */}
        {selectedFiles.length > 0 && (
          <div className="flex-1 overflow-y-auto mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Selected Files ({selectedFiles.length})
            </h4>
            <div className="space-y-3">
              {selectedFiles.map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  {/* File Preview/Icon */}
                  <div className="flex-shrink-0">
                    {file.type === 'image' && file.preview ? (
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <SafeIcon 
                          icon={getFileIcon(file.type)} 
                          className="w-6 h-6 text-gray-600" 
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {file.type}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center space-x-1">
                    {file.type === 'image' && (
                      <button
                        onClick={() => window.open(file.preview, '_blank')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <SafeIcon icon={FiEye} className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Maximum file size: 50MB per file
          </p>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSend}
              disabled={selectedFiles.length === 0}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SafeIcon icon={FiCheck} className="w-4 h-4" />
              <span>Attach {selectedFiles.length > 0 && `(${selectedFiles.length})`}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FileAttachment;