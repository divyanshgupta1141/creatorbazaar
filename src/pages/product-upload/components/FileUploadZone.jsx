import React, { useCallback, useState } from 'react';
import Icon from '../../../components/AppIcon';

const FileUploadZone = ({ onFileSelect, selectedFile, currentLanguage }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const acceptedTypes = {
    'application/pdf': '.pdf',
    'video/mp4': '.mp4',
    'application/zip': '.zip',
    'application/x-zip-compressed': '.zip'
  };

  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const validateFile = (file) => {
    if (!Object.keys(acceptedTypes).includes(file.type)) {
      return currentLanguage === 'hi' ?'केवल PDF, MP4, और ZIP फ़ाइलें स्वीकार की जाती हैं' :'Only PDF, MP4, and ZIP files are accepted';
    }
    
    if (file.size > maxFileSize) {
      return currentLanguage === 'hi' ?'फ़ाइल का आकार 100MB से कम होना चाहिए' :'File size must be less than 100MB';
    }
    
    return null;
  };

  const handleFileSelect = (file) => {
    const error = validateFile(file);
    if (error) {
      setUploadError(error);
      return;
    }
    
    setUploadError('');
    onFileSelect(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('video')) return 'Video';
    if (fileType.includes('zip')) return 'Archive';
    return 'File';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (selectedFile) {
    return (
      <div className="w-full">
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200 rounded-xl p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Icon 
                name={getFileIcon(selectedFile.type)} 
                size={24} 
                color="white" 
                strokeWidth={2}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-primary truncate">
                {selectedFile.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {formatFileSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}
              </p>
            </div>
            <button
              onClick={() => onFileSelect(null)}
              className="p-2 text-text-secondary hover:text-error hover:bg-error-50 rounded-lg transition-colors duration-200 touch-target"
              aria-label={currentLanguage === 'hi' ? 'फ़ाइल हटाएं' : 'Remove file'}
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <label className="inline-flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-primary hover:bg-primary-50 cursor-pointer transition-colors duration-200 spring-transition">
            <Icon name="RefreshCw" size={16} />
            <span>{currentLanguage === 'hi' ? 'फ़ाइल बदलें' : 'Replace File'}</span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.mp4,.zip"
              onChange={handleInputChange}
            />
          </label>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 spring-transition ${
          isDragOver
            ? 'border-primary bg-primary-50 scale-[1.02]'
            : 'border-border hover:border-primary-300 hover:bg-primary-50/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDragOver 
              ? 'bg-gradient-to-br from-primary to-accent scale-110' :'bg-gradient-to-br from-primary-100 to-accent-100'
          }`}>
            <Icon 
              name="Upload" 
              size={32} 
              color={isDragOver ? 'white' : 'var(--color-primary)'} 
              strokeWidth={2}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-primary">
              {currentLanguage === 'hi' ?'अपनी डिजिटल फ़ाइल अपलोड करें' :'Upload Your Digital File'
              }
            </h3>
            <p className="text-text-secondary">
              {currentLanguage === 'hi' ?'फ़ाइल को यहाँ खींचें और छोड़ें या ब्राउज़ करने के लिए क्लिक करें' :'Drag and drop your file here or click to browse'
              }
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs text-text-tertiary">
            <span className="px-2 py-1 bg-surface rounded-md border">PDF</span>
            <span className="px-2 py-1 bg-surface rounded-md border">MP4</span>
            <span className="px-2 py-1 bg-surface rounded-md border">ZIP</span>
          </div>

          <label className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 spring-transition touch-target">
            <Icon name="FolderOpen" size={20} />
            <span>
              {currentLanguage === 'hi' ? 'फ़ाइल चुनें' : 'Choose File'}
            </span>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.mp4,.zip"
              onChange={handleInputChange}
            />
          </label>

          <p className="text-xs text-text-tertiary">
            {currentLanguage === 'hi' ?'अधिकतम फ़ाइल आकार: 100MB' :'Maximum file size: 100MB'
            }
          </p>
        </div>
      </div>

      {uploadError && (
        <div className="mt-4 p-4 bg-error-50 border border-error-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={20} color="var(--color-error)" />
            <p className="text-sm text-error font-medium">{uploadError}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;