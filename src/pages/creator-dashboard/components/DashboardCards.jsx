import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const DashboardCards = ({ currentLanguage }) => {
  const navigate = useNavigate();

  const dashboardTasks = [
    {
      id: 'welcome',
      title: currentLanguage === 'hi' ? 'स्वागत है' : 'Welcome Aboard',
      description: currentLanguage === 'hi' ? 'अपनी प्रोफाइल पूरी करें' : 'Complete your profile setup',
      icon: 'UserCheck',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-white',
      progress: 75,
      action: () => navigate('/profile-setup')
    },
    {
      id: 'impression',
      title: currentLanguage === 'hi' ? 'प्रभाव बनाएं' : 'Make an Impression',
      description: currentLanguage === 'hi' ? 'अपना पहला उत्पाद अपलोड करें' : 'Upload your first product',
      icon: 'Upload',
      color: 'from-emerald-500 to-emerald-600',
      textColor: 'text-white',
      progress: 0,
      action: () => navigate('/product-upload')
    },
    {
      id: 'showtime',
      title: currentLanguage === 'hi' ? 'शोटाइम' : 'Showtime',
      description: currentLanguage === 'hi' ? 'अपने उत्पाद को प्रकाशित करें' : 'Publish your product',
      icon: 'Eye',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-white',
      progress: 0,
      action: () => navigate('/individual-product-management')
    },
    {
      id: 'tribe',
      title: currentLanguage === 'hi' ? 'अपना समुदाय बनाएं' : 'Build Your Tribe',
      description: currentLanguage === 'hi' ? 'सोशल मीडिया पर साझा करें' : 'Share on social media',
      icon: 'Users',
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-white',
      progress: 0,
      action: () => window.open('https://twitter.com/intent/tweet?text=Check out my CreatorBazaar profile!', '_blank')
    },
    {
      id: 'cha-ching',
      title: currentLanguage === 'hi' ? 'चा-चिंग' : 'Cha-ching',
      description: currentLanguage === 'hi' ? 'अपनी पहली बिक्री करें' : 'Make your first sale',
      icon: 'DollarSign',
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-white',
      progress: 0,
      action: () => navigate('/individual-product-management')
    },
    {
      id: 'money-inbound',
      title: currentLanguage === 'hi' ? 'पैसा आ रहा है' : 'Money Inbound',
      description: currentLanguage === 'hi' ? 'UPI सेटअप करें' : 'Set up UPI payments',
      icon: 'CreditCard',
      color: 'from-green-500 to-green-600',
      textColor: 'text-white',
      progress: 50,
      action: () => navigate('/creator-dashboard')
    },
    {
      id: 'waves',
      title: currentLanguage === 'hi' ? 'लहरें बनाना' : 'Making Waves',
      description: currentLanguage === 'hi' ? 'अपने एनालिटिक्स देखें' : 'Check your analytics',
      icon: 'TrendingUp',
      color: 'from-teal-500 to-teal-600',
      textColor: 'text-white',
      progress: 25,
      action: () => navigate('/creator-dashboard')
    },
    {
      id: 'smart-move',
      title: currentLanguage === 'hi' ? 'स्मार्ट मूव' : 'Smart Move',
      description: currentLanguage === 'hi' ? 'अपनी कमाई ऑप्टिमाइज़ करें' : 'Optimize your earnings',
      icon: 'Target',
      color: 'from-indigo-500 to-indigo-600',
      textColor: 'text-white',
      progress: 10,
      action: () => navigate('/creator-dashboard')
    }
  ];

  return (
    <div className="mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {currentLanguage === 'hi' ? 'आपके कार्य' : 'Your Tasks'}
        </h2>
        <p className="text-text-secondary">
          {currentLanguage === 'hi' ? 'अपनी सफलता की यात्रा पूरी करें' : 'Complete your journey to success'}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="cursor-pointer"
            onClick={task.action}
          >
            <div className={`bg-gradient-to-br ${task.color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center`}>
                  <Icon name={task.icon} size={24} className={task.textColor} strokeWidth={2} />
                </div>
                {task.progress > 0 && (
                  <div className="text-right">
                    <div className={`text-xs ${task.textColor} opacity-80 mb-1`}>
                      {task.progress}%
                    </div>
                    <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-white transition-all duration-500"
                        style={{ width: `${task.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <h3 className={`text-lg font-bold ${task.textColor} mb-2 line-clamp-1`}>
                {task.title}
              </h3>
              
              <p className={`text-sm ${task.textColor} opacity-90 line-clamp-2`}>
                {task.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className={`text-xs ${task.textColor} opacity-70`}>
                  {task.progress === 0 
                    ? (currentLanguage === 'hi' ? 'शुरू करें' : 'Get Started')
                    : task.progress === 100 
                    ? (currentLanguage === 'hi' ? 'पूर्ण' : 'Complete')
                    : (currentLanguage === 'hi' ? 'प्रगति में' : 'In Progress')
                  }
                </div>
                <Icon name="ArrowRight" size={16} className={`${task.textColor} opacity-70`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;