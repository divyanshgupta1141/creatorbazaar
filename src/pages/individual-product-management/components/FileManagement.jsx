import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FileManagement = ({ product, onFileReplace, currentLanguage }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getFileIcon = (fileType) => {
    switch (fileType?.toLowerCase()) {
      case 'pdf':
        return 'FileText';
      case 'mp4':
        return 'Video';
      case 'zip':
        return 'Archive';
      default:
        return 'File';
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'video/mp4', 'application/zip'];
    if (!allowedTypes.includes(file.type)) {
      alert(currentLanguage === 'hi' ?'केवल PDF, MP4, और ZIP फाइलें अपलोड की जा सकती हैं।' :'Only PDF, MP4, and ZIP files are allowed.'
      );
      return;
    }

    // Validate file size (max 100MB)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(currentLanguage === 'hi' ?'फाइल का साइज 100MB से कम होना चाहिए।' :'File size must be less than 100MB.'
      );
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload with progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          
          // Create new file object
          const newFile = {
            fileName: file.name,
            fileType: file.type.split('/')[1],
            fileSize: file.size,
            uploadDate: new Date().toLocaleDateString('en-IN')
          };
          
          onFileReplace(newFile);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="bg-surface rounded-xl border border-border shadow-md">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-bold text-text-primary">
          {currentLanguage === 'hi' ? 'फ़ाइल प्रबंधन' : 'File Management'}
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          {currentLanguage === 'hi' ?'अपनी फ़ाइल को बदलें या अपडेट करें' :'Replace or update your file'
          }
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Current File Info */}
        <div className="bg-background-secondary rounded-lg p-4">
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            {currentLanguage === 'hi' ? 'वर्तमान फ़ाइल' : 'Current File'}
          </h3>
          
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
                <Icon 
                  name={getFileIcon(product.fileType)} 
                  size={24} 
                  className="text-primary"
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary truncate">
                {product.fileName}
              </div>
              <div className="text-xs text-text-secondary mt-1">
                {product.fileType?.toUpperCase()} • {formatFileSize(product.fileSize)}
              </div>
              <div className="text-xs text-text-secondary">
                {currentLanguage === 'hi' ? 'अपलोड:' : 'Uploaded:'} {product.uploadDate}
              </div>
            </div>
            
            <div className="flex-shrink-0 flex space-x-2">
              <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200">
                <Icon name="Download" size={16} />
              </button>
              <button className="p-2 text-text-secondary hover:text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200">
                <Icon name="Eye" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* File Upload Area */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            {currentLanguage === 'hi' ? 'नई फ़ाइल अपलोड करें' : 'Upload New File'}
          </h3>
          
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              isDragOver
                ? 'border-primary bg-primary-50' :'border-border hover:border-primary hover:bg-primary-50/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="space-y-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Upload" size={24} className="text-primary animate-pulse" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {currentLanguage === 'hi' ? 'अपलोड हो रहा है...' : 'Uploading...'}
                  </p>
                  <div className="w-full bg-border rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs text-text-secondary mt-1">
                    {uploadProgress}% {currentLanguage === 'hi' ? 'पूर्ण' : 'complete'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Upload" size={24} className="text-primary" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-text-primary">
                    {currentLanguage === 'hi' ?'फ़ाइल को यहाँ खींचें और छोड़ें' :'Drag and drop your file here'
                    }
                  </p>
                  <p className="text-xs text-text-secondary">
                    {currentLanguage === 'hi' ? 'या' : 'or'}
                  </p>
                </div>
                
                <input
                  type="file"
                  accept=".pdf,.mp4,.zip"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <Button
                  variant="outline"
                  iconName="FolderOpen"
                  iconPosition="left"
                  className="mt-4"
                >
                  {currentLanguage === 'hi' ? 'फ़ाइल चुनें' : 'Choose File'}
                </Button>
              </>
            )}
          </div>
          
          <div className="mt-3 text-xs text-text-secondary">
            <p>
              {currentLanguage === 'hi' ?'समर्थित फॉर्मेट: PDF, MP4, ZIP • अधिकतम साइज: 100MB' :'Supported formats: PDF, MP4, ZIP • Max size: 100MB'
              }
            </p>
          </div>
        </div>

        {/* File History */}
        <div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">
            {currentLanguage === 'hi' ? 'फ़ाइल इतिहास' : 'File History'}
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-background-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-success-50 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} className="text-success-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-primary">
                    {product.fileName}
                  </div>
                  <div className="text-xs text-text-secondary">
                    {currentLanguage === 'hi' ? 'वर्तमान संस्करण' : 'Current version'} • {product.uploadDate}
                  </div>
                </div>
              </div>
              <div className="text-xs text-success-600 font-medium">
                {currentLanguage === 'hi' ? 'सक्रिय' : 'Active'}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-text-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Archive" size={16} className="text-text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-text-secondary">
                    old_version_v1.pdf
                  </div>
                  <div className="text-xs text-text-secondary">
                    {currentLanguage === 'hi' ? 'पुराना संस्करण' : 'Previous version'} • 15/11/2024
                  </div>
                </div>
              </div>
              <button className="text-xs text-primary hover:text-primary-600 font-medium">
                {currentLanguage === 'hi' ? 'पुनर्स्थापित करें' : 'Restore'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileManagement;