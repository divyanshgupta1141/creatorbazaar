import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UploadPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    visibility: 'public',
  });
  
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/dashboard/upload' } });
    }
  }, [navigate]);

  const categories = [
    { value: '', label: currentLanguage === 'hi' ? '-- श्रेणी चुनें --' : '-- Select Category --' },
    { value: 'course', label: currentLanguage === 'hi' ? 'कोर्स' : 'Course' },
    { value: 'ebook', label: currentLanguage === 'hi' ? 'ई-बुक' : 'E-book' },
    { value: 'template', label: currentLanguage === 'hi' ? 'टेम्प्लेट' : 'Template' },
    { value: 'design', label: currentLanguage === 'hi' ? 'डिज़ाइन' : 'Design' },
    { value: 'audio', label: currentLanguage === 'hi' ? 'ऑडियो' : 'Audio' },
    { value: 'software', label: currentLanguage === 'hi' ? 'सॉफ्टवेयर' : 'Software' },
    { value: 'coaching', label: currentLanguage === 'hi' ? 'कोचिंग' : 'Coaching' },
    { value: 'other', label: currentLanguage === 'hi' ? 'अन्य' : 'Other' }
  ];

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: ''
      });
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'video/mp4', 'application/zip', 'application/x-zip-compressed'];
      const maxSize = 100 * 1024 * 1024; // 100MB
      
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          file: currentLanguage === 'hi' ? 'केवल PDF, MP4, और ZIP फ़ाइलें स्वीकृत हैं' : 'Only PDF, MP4, and ZIP files are accepted'
        });
        return;
      }
      
      if (file.size > maxSize) {
        setErrors({
          ...errors,
          file: currentLanguage === 'hi' ? 'फ़ाइल 100MB से छोटी होनी चाहिए' : 'File must be smaller than 100MB'
        });
        return;
      }
      
      setSelectedFile(file);
      setErrors({
        ...errors,
        file: ''
      });
    }
  };

  const handleThumbnailSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          thumbnail: currentLanguage === 'hi' ? 'केवल JPG और PNG फ़ाइलें स्वीकृत हैं' : 'Only JPG and PNG files are accepted'
        });
        return;
      }
      
      if (file.size > maxSize) {
        setErrors({
          ...errors,
          thumbnail: currentLanguage === 'hi' ? 'छवि 5MB से छोटी होनी चाहिए' : 'Image must be smaller than 5MB'
        });
        return;
      }
      
      setThumbnailFile(file);
      setErrors({
        ...errors,
        thumbnail: ''
      });
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
      
      // Clean up URL when component unmounts
      return () => URL.revokeObjectURL(previewUrl);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      // Validate file type and size
      const validTypes = ['application/pdf', 'video/mp4', 'application/zip', 'application/x-zip-compressed'];
      const maxSize = 100 * 1024 * 1024; // 100MB
      
      if (!validTypes.includes(file.type)) {
        setErrors({
          ...errors,
          file: currentLanguage === 'hi' ? 'केवल PDF, MP4, और ZIP फ़ाइलें स्वीकृत हैं' : 'Only PDF, MP4, and ZIP files are accepted'
        });
        return;
      }
      
      if (file.size > maxSize) {
        setErrors({
          ...errors,
          file: currentLanguage === 'hi' ? 'फ़ाइल 100MB से छोटी होनी चाहिए' : 'File must be smaller than 100MB'
        });
        return;
      }
      
      setSelectedFile(file);
      setErrors({
        ...errors,
        file: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = currentLanguage === 'hi' ? 'शीर्षक आवश्यक है' : 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = currentLanguage === 'hi' ? 'विवरण आवश्यक है' : 'Description is required';
    }
    
    if (!formData.category) {
      newErrors.category = currentLanguage === 'hi' ? 'श्रेणी आवश्यक है' : 'Category is required';
    }
    
    if (!formData.price || isNaN(formData.price) || formData.price < 49) {
      newErrors.price = currentLanguage === 'hi' ? 'कीमत कम से कम ₹49 होनी चाहिए' : 'Price must be at least ₹49';
    }
    
    if (!selectedFile) {
      newErrors.file = currentLanguage === 'hi' ? 'फ़ाइल अपलोड करना आवश्यक है' : 'File upload is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create product object
      const newProduct = {
        id: `prod_${Math.random().toString(36).substr(2, 9)}`,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseInt(formData.price),
        visibility: formData.visibility,
        fileName: selectedFile.name,
        fileType: selectedFile.type.split('/')[1],
        fileSize: selectedFile.size,
        thumbnailUrl: thumbnailPreview,
        status: formData.visibility === 'public' ? 'active' : 'draft',
        createdAt: new Date().toISOString(),
      };
      
      // Save to localStorage (mock database)
      const existingProducts = JSON.parse(localStorage.getItem('userProducts') || '[]');
      existingProducts.push(newProduct);
      localStorage.setItem('userProducts', JSON.stringify(existingProducts));
      
      // Show success and redirect
      alert(currentLanguage === 'hi' ? 'उत्पाद सफलतापूर्वक बनाया गया!' : 'Product created successfully!');
      navigate('/dashboard/products');
      
    } catch (error) {
      console.error('Error creating product:', error);
      alert(currentLanguage === 'hi' ? 'उत्पाद बनाने में त्रुटि' : 'Error creating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (!fileType) return 'File';
    fileType = fileType.toLowerCase();
    
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('mp4') || fileType.includes('video')) return 'Video';
    if (fileType.includes('zip')) return 'Archive';
    return 'File';
  };

  return (
    <>
      <Helmet>
        <title>
          {currentLanguage === 'hi' ? 'उत्पाद अपलोड करें - CreatorBazaar' : 'Upload Product - CreatorBazaar'}
        </title>
      </Helmet>

      <DashboardLayout currentPage="upload">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentLanguage === 'hi' ? 'उत्पाद अपलोड करें' : 'Upload a Product'}
            </h1>
            <p className="text-gray-600">
              {currentLanguage === 'hi' ? 'अपना नया डिजिटल उत्पाद जोड़ें' : 'Add a new digital product to sell'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentLanguage === 'hi' ? 'उत्पाद विवरण' : 'Product Details'}
                </h2>
                
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {currentLanguage === 'hi' ? 'उत्पाद शीर्षक' : 'Product Title'} *
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder={currentLanguage === 'hi' ? 'एक आकर्षक शीर्षक दें' : 'Enter a catchy title'}
                      className={errors.title ? 'border-error focus:ring-error' : ''}
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.title}</span>
                      </p>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {currentLanguage === 'hi' ? 'उत्पाद विवरण' : 'Product Description'} *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder={currentLanguage === 'hi' ? 'अपने उत्पाद का विस्तृत विवरण दें' : 'Describe your product in detail'}
                      rows={5}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                        errors.description ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-primary focus:border-primary'
                      }`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.description}</span>
                      </p>
                    )}
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {currentLanguage === 'hi' ? 'श्रेणी' : 'Category'} *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.category ? 'border-error focus:ring-error' : 'border-gray-300 focus:ring-primary focus:border-primary'
                      }`}
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.category}</span>
                      </p>
                    )}
                  </div>
                  
                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {currentLanguage === 'hi' ? 'मूल्य (₹)' : 'Price (₹)'} *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">₹</span>
                      </div>
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="49"
                        min="49"
                        className={`pl-7 ${errors.price ? 'border-error focus:ring-error' : ''}`}
                      />
                    </div>
                    {errors.price ? (
                      <p className="mt-1 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.price}</span>
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500">
                        {currentLanguage === 'hi' ? 'न्यूनतम मूल्य ₹49 है' : 'Minimum price is ₹49'}
                      </p>
                    )}
                  </div>
                  
                  {/* Visibility */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      {currentLanguage === 'hi' ? 'दृश्यता' : 'Visibility'}
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="visibility"
                          value="public"
                          checked={formData.visibility === 'public'}
                          onChange={() => handleInputChange('visibility', 'public')}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700">
                          {currentLanguage === 'hi' ? 'सार्वजनिक' : 'Public'}
                        </span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="visibility"
                          value="draft"
                          checked={formData.visibility === 'draft'}
                          onChange={() => handleInputChange('visibility', 'draft')}
                          className="text-primary focus:ring-primary"
                        />
                        <span className="text-gray-700">
                          {currentLanguage === 'hi' ? 'ड्राफ्ट' : 'Draft'}
                        </span>
                      </label>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {currentLanguage === 'hi' 
                        ? 'ड्राफ्ट उत्पाद बाद में प्रकाशित किए जा सकते हैं' 
                        : 'Draft products can be published later'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* File Upload Section */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentLanguage === 'hi' ? 'फ़ाइल अपलोड' : 'File Upload'}
                </h2>
                
                {!selectedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
                      isDragOver 
                        ? 'border-primary bg-primary-50' 
                        : 'border-gray-300 hover:border-primary hover:bg-gray-50'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleFileDrop}
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-4">
                        <Icon name="Upload" size={48} className="text-gray-400" />
                      </div>
                      <p className="mb-4 text-gray-700 font-medium">
                        {currentLanguage === 'hi' 
                          ? 'अपनी फ़ाइल यहां खींचें और छोड़ें' 
                          : 'Drag and drop your file here'}
                      </p>
                      <p className="text-gray-500 mb-4">
                        {currentLanguage === 'hi' ? 'या' : 'or'}
                      </p>
                      <label className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg cursor-pointer hover:bg-primary-600 transition-colors duration-200">
                        <Icon name="FolderOpen" size={16} className="mr-2" />
                        {currentLanguage === 'hi' ? 'फ़ाइल चुनें' : 'Choose File'}
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.mp4,.zip"
                          onChange={handleFileSelect}
                        />
                      </label>
                      <p className="mt-4 text-xs text-gray-500">
                        {currentLanguage === 'hi' 
                          ? 'समर्थित प्रारूप: PDF, MP4, ZIP • अधिकतम आकार: 100MB' 
                          : 'Supported formats: PDF, MP4, ZIP • Max size: 100MB'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
                          <Icon 
                            name={getFileIcon(selectedFile.type)} 
                            size={24} 
                            className="text-primary"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 truncate max-w-xs">
                            {selectedFile.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatFileSize(selectedFile.size)} • {selectedFile.type.split('/')[1].toUpperCase()}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedFile(null)}
                        className="text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Icon name="X" size={20} />
                      </button>
                    </div>
                  </div>
                )}
                
                {errors.file && (
                  <p className="mt-2 text-sm text-error flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{errors.file}</span>
                  </p>
                )}
              </div>
              
              {/* Thumbnail Upload Section */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {currentLanguage === 'hi' ? 'थंबनेल छवि' : 'Thumbnail Image'}
                  </h2>
                  <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded">
                    {currentLanguage === 'hi' ? 'वैकल्पिक' : 'Optional'}
                  </span>
                </div>
                
                <div className="flex items-start space-x-6">
                  {/* Thumbnail Preview */}
                  <div className="w-32 h-32 relative flex-shrink-0">
                    {thumbnailPreview ? (
                      <div className="w-full h-full relative">
                        <img 
                          src={thumbnailPreview} 
                          alt="Thumbnail" 
                          className="w-full h-full object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setThumbnailPreview('');
                            setThumbnailFile(null);
                          }}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center"
                        >
                          <Icon name="X" size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                        <Icon name="Image" size={24} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Upload Instructions */}
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-3">
                      {currentLanguage === 'hi' 
                        ? 'थंबनेल आपके उत्पाद की पहली छवि होगी जो ग्राहकों को दिखाई देगी'
                        : 'The thumbnail will be the first image customers see of your product'}
                    </p>
                    <label className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200">
                      <Icon name="Upload" size={16} className="mr-2" />
                      {currentLanguage === 'hi' ? 'छवि अपलोड करें' : 'Upload Image'}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleThumbnailSelect}
                      />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">
                      {currentLanguage === 'hi' 
                        ? 'समर्थित प्रारूप: JPG, PNG • अधिकतम आकार: 5MB • अनुशंसित आकार: 1200 x 800px'
                        : 'Supported formats: JPG, PNG • Max size: 5MB • Recommended size: 1200 x 800px'}
                    </p>
                    
                    {errors.thumbnail && (
                      <p className="mt-2 text-sm text-error flex items-center space-x-1">
                        <Icon name="AlertCircle" size={14} />
                        <span>{errors.thumbnail}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Submit Section */}
              <div className="p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                        <Icon name="Zap" size={16} className="text-success" />
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {currentLanguage === 'hi' ? 'बीटा ऑफर!' : 'Beta Offer!'}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 pl-10">
                      {currentLanguage === 'hi' 
                        ? 'बीटा अवधि के दौरान 0% प्लेटफॉर्म फीस'
                        : '0% platform fees during beta period'}
                    </p>
                  </div>
                  
                  <div className="w-full sm:w-auto">
                    <Button
                      type="submit"
                      variant="primary"
                      loading={isSubmitting}
                      fullWidth
                      iconName="Rocket"
                      iconPosition="left"
                      className="h-12 px-8 text-lg font-semibold"
                    >
                      {isSubmitting
                        ? (currentLanguage === 'hi' ? 'प्रकाशित हो रहा है...' : 'Publishing...')
                        : (currentLanguage === 'hi' ? 'उत्पाद प्रकाशित करें' : 'Publish Product')}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          {/* Tips Section */}
          <div className="mt-8 bg-primary-50 rounded-xl border border-primary-200 p-6">
            <h3 className="flex items-center text-lg font-semibold text-primary mb-4">
              <Icon name="Lightbulb" size={20} className="mr-2" />
              {currentLanguage === 'hi' ? 'बेहतर बिक्री के लिए सुझाव' : 'Tips for Better Sales'}
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <Icon name="Check" size={12} color="white" />
                </div>
                <p className="text-gray-700">
                  {currentLanguage === 'hi' 
                    ? 'अपने शीर्षक में कीवर्ड और मूल्य प्रस्ताव शामिल करें'
                    : 'Include keywords and value proposition in your title'}
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <Icon name="Check" size={12} color="white" />
                </div>
                <p className="text-gray-700">
                  {currentLanguage === 'hi' 
                    ? 'विस्तृत विवरण में उत्पाद की विशेषताएं और लाभ शामिल करें'
                    : 'Include features and benefits in your detailed description'}
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <Icon name="Check" size={12} color="white" />
                </div>
                <p className="text-gray-700">
                  {currentLanguage === 'hi' 
                    ? 'आकर्षक थंबनेल छवि अपलोड करें जो आपके उत्पाद को प्रदर्शित करे'
                    : 'Upload an attractive thumbnail image that showcases your product'}
                </p>
              </div>
              
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                  <Icon name="Check" size={12} color="white" />
                </div>
                <p className="text-gray-700">
                  {currentLanguage === 'hi' 
                    ? 'प्रतिस्पर्धात्मक मूल्य निर्धारित करें जो आपके उत्पाद के मूल्य को दर्शाता हो'
                    : 'Set a competitive price that reflects the value of your product'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default UploadPage;