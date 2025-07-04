import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmailsPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('logs');
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Mock email data
    const mockEmails = [
      {
        id: 1,
        type: 'purchase',
        recipient: 'customer@example.com',
        subject: 'Thank you for your purchase!',
        status: 'delivered',
        sentAt: '2024-01-15T10:30:00Z',
        productTitle: 'Digital Marketing Course'
      },
      {
        id: 2,
        type: 'download',
        recipient: 'user@example.com',
        subject: 'Your download is ready',
        status: 'delivered',
        sentAt: '2024-01-15T09:15:00Z',
        productTitle: 'Design Templates Bundle'
      },
      {
        id: 3,
        type: 'welcome',
        recipient: 'newuser@example.com',
        subject: 'Welcome to CreatorBazaar',
        status: 'pending',
        sentAt: '2024-01-15T08:45:00Z',
        productTitle: null
      }
    ];
    setEmails(mockEmails);
  }, []);

  const emailTemplates = [
    {
      id: 'purchase',
      name: 'Purchase Confirmation',
      description: 'Sent when a customer purchases a product',
      lastModified: '2024-01-10'
    },
    {
      id: 'download',
      name: 'Download Ready',
      description: 'Sent with download links after purchase',
      lastModified: '2024-01-10'
    },
    {
      id: 'welcome',
      name: 'Welcome Email',
      description: 'Sent to new customers',
      lastModified: '2024-01-08'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getEmailTypeIcon = (type) => {
    switch (type) {
      case 'purchase':
        return 'ShoppingCart';
      case 'download':
        return 'Download';
      case 'welcome':
        return 'UserPlus';
      default:
        return 'Mail';
    }
  };

  return (
    <>
      <Helmet>
        <title>Emails - CreatorBazaar Dashboard</title>
      </Helmet>

      <DashboardLayout currentPage="emails">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Email Management</h1>
            <p className="text-white/60">Manage customer emails and templates</p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-dark-surface rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'logs'
                  ? 'bg-highlight text-black'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon name="Mail" size={16} className="inline mr-2" />
              Email Logs
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'bg-highlight text-black'
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon name="FileText" size={16} className="inline mr-2" />
              Templates
            </button>
          </div>

          {/* Email Logs Tab */}
          {activeTab === 'logs' && (
            <div className="bg-dark-surface rounded-lg border border-white/10">
              <div className="p-4 border-b border-white/10">
                <h3 className="text-lg font-semibold text-white">Recent Email Activity</h3>
              </div>
              <div className="divide-y divide-white/10">
                {emails.map((email) => (
                  <div key={email.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                          <Icon name={getEmailTypeIcon(email.type)} size={20} className="text-primary" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{email.subject}</div>
                          <div className="text-white/60 text-sm">To: {email.recipient}</div>
                          {email.productTitle && (
                            <div className="text-white/40 text-xs mt-1">Product: {email.productTitle}</div>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(email.status)}`}>
                          {email.status}
                        </div>
                        <div className="text-white/40 text-xs mt-1">
                          {new Date(email.sentAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Email Templates</h3>
                <Button
                  variant="primary"
                  iconName="Plus"
                  iconPosition="left"
                  className="bg-highlight hover:bg-highlight-600 text-black"
                >
                  Create Template
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {emailTemplates.map((template) => (
                  <div key={template.id} className="bg-dark-surface rounded-lg p-6 border border-white/10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="FileText" size={24} className="text-primary" />
                      </div>
                      <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <Icon name="MoreVertical" size={16} />
                      </button>
                    </div>
                    
                    <h4 className="text-white font-semibold mb-2">{template.name}</h4>
                    <p className="text-white/60 text-sm mb-4">{template.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-white/40 text-xs">
                        Updated: {template.lastModified}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Edit"
                        className="border-white/20 text-white hover:bg-white/10"
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default EmailsPage;