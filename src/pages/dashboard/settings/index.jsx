import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SettingsPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    website: '',
    phone: ''
  });
  const [platformSettings, setPlatformSettings] = useState({
    emailNotifications: true,
    marketingEmails: false,
    publicProfile: true,
    autoDelivery: true
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Load profile data
    const userEmail = localStorage.getItem('userEmail') || '';
    const userName = localStorage.getItem('userName') || '';
    setProfileData({
      name: userName,
      email: userEmail,
      bio: 'Digital creator passionate about sharing knowledge',
      website: 'https://mywebsite.com',
      phone: '+91 9876543210'
    });
  }, []);

  const handleProfileSave = () => {
    localStorage.setItem('userName', profileData.name);
    localStorage.setItem('userEmail', profileData.email);
    alert('Profile updated successfully!');
  };

  const handleSettingsSave = () => {
    localStorage.setItem('platformSettings', JSON.stringify(platformSettings));
    alert('Settings updated successfully!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'platform', label: 'Platform', icon: 'Settings' },
    { id: 'payments', label: 'Payments', icon: 'CreditCard' },
    { id: 'security', label: 'Security', icon: 'Shield' }
  ];

  return (
    <>
      <Helmet>
        <title>Settings - CreatorBazaar Dashboard</title>
      </Helmet>

      <DashboardLayout currentPage="settings">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
            <p className="text-white/60">Manage your profile and platform preferences</p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-dark-surface rounded-lg p-1 border border-white/10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-highlight text-black'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon name={tab.icon} size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Profile Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="User" size={32} color="white" />
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Upload"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Upload Photo
                    </Button>
                    <p className="text-white/40 text-xs mt-2">JPG, PNG up to 5MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Full Name</label>
                    <Input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="bg-dark-bg border-white/20 text-white placeholder-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="bg-dark-bg border-white/20 text-white placeholder-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone</label>
                    <Input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="bg-dark-bg border-white/20 text-white placeholder-white/40"
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Website</label>
                    <Input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                      className="bg-dark-bg border-white/20 text-white placeholder-white/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-dark-bg border border-white/20 rounded-lg text-white placeholder-white/40 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={handleProfileSave}
                    iconName="Save"
                    iconPosition="left"
                    className="bg-highlight hover:bg-highlight-600 text-black"
                  >
                    Save Profile
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Platform Tab */}
          {activeTab === 'platform' && (
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Platform Settings</h3>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Notifications</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">Email Notifications</div>
                      <div className="text-white/60 text-sm">Receive notifications about sales and activity</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={platformSettings.emailNotifications}
                        onChange={(e) => setPlatformSettings({...platformSettings, emailNotifications: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-highlight"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">Marketing Emails</div>
                      <div className="text-white/60 text-sm">Receive updates about new features and tips</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={platformSettings.marketingEmails}
                        onChange={(e) => setPlatformSettings({...platformSettings, marketingEmails: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-highlight"></div>
                    </label>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-white font-medium mb-4">Privacy</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">Public Profile</div>
                      <div className="text-white/60 text-sm">Make your creator profile visible to customers</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={platformSettings.publicProfile}
                        onChange={(e) => setPlatformSettings({...platformSettings, publicProfile: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-highlight"></div>
                    </label>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-white font-medium mb-4">Sales</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">Auto Delivery</div>
                      <div className="text-white/60 text-sm">Automatically send download links after purchase</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={platformSettings.autoDelivery}
                        onChange={(e) => setPlatformSettings({...platformSettings, autoDelivery: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-highlight"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    variant="primary"
                    onClick={handleSettingsSave}
                    iconName="Save"
                    iconPosition="left"
                    className="bg-highlight hover:bg-highlight-600 text-black"
                  >
                    Save Settings
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Payment Settings</h3>
              
              <div className="space-y-6">
                <div className="bg-dark-bg rounded-lg p-4 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon name="Smartphone" size={24} className="text-primary" />
                      <div>
                        <div className="text-white font-medium">UPI Payment</div>
                        <div className="text-white/60 text-sm">yourname@paytm</div>
                      </div>
                    </div>
                    <div className="text-green-400 text-sm font-medium">Active</div>
                  </div>
                </div>

                <Button
                  variant="outline"
                  iconName="Plus"
                  iconPosition="left"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Add Payment Method
                </Button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-6">Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-4">Password</h4>
                  <div className="space-y-4">
                    <Input
                      type="password"
                      placeholder="Current password"
                      className="bg-dark-bg border-white/20 text-white placeholder-white/40"
                    />
                    <Input
                      type="password"
                      placeholder="New password"
                      className="bg-dark-bg border-white/20 text-white placeholder-white/40"
                    />
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      className="bg-dark-bg border-white/20 text-white placeholder-white/40"
                    />
                    <Button
                      variant="primary"
                      iconName="Key"
                      iconPosition="left"
                      className="bg-highlight hover:bg-highlight-600 text-black"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-white font-medium mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white">SMS Authentication</div>
                      <div className="text-white/60 text-sm">Add an extra layer of security</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Enable
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default SettingsPage;