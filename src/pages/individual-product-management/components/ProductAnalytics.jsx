import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProductAnalytics = ({ product, currentLanguage }) => {
  // Mock analytics data
  const viewsData = [
    { date: '01/12', views: 45, sales: 2 },
    { date: '02/12', views: 62, sales: 3 },
    { date: '03/12', views: 38, sales: 1 },
    { date: '04/12', views: 78, sales: 4 },
    { date: '05/12', views: 95, sales: 6 },
    { date: '06/12', views: 67, sales: 3 },
    { date: '07/12', views: 89, sales: 5 }
  ];

  const trafficSources = [
    { name: currentLanguage === 'hi' ? 'डायरेक्ट' : 'Direct', value: 45, color: '#003366' },
    { name: currentLanguage === 'hi' ? 'सोशल मीडिया' : 'Social Media', value: 30, color: '#0483B8' },
    { name: currentLanguage === 'hi' ? 'रेफरल' : 'Referral', value: 15, color: '#00B4C6' },
    { name: currentLanguage === 'hi' ? 'खोज' : 'Search', value: 10, color: '#FFC100' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const conversionRate = product.totalSales && product.totalViews 
    ? ((product.totalSales / product.totalViews) * 100).toFixed(2)
    : '0.00';

  const avgOrderValue = product.totalSales > 0 
    ? (product.totalRevenue / product.totalSales)
    : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">
                {currentLanguage === 'hi' ? 'कुल व्यूज' : 'Total Views'}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {product.totalViews?.toLocaleString('en-IN') || '0'}
              </p>
            </div>
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={20} className="text-primary" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Icon name="TrendingUp" size={14} className="text-success-500 mr-1" />
            <span className="text-success-500">+12.5%</span>
            <span className="text-text-secondary ml-1">
              {currentLanguage === 'hi' ? 'पिछले सप्ताह से' : 'from last week'}
            </span>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">
                {currentLanguage === 'hi' ? 'कुल बिक्री' : 'Total Sales'}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {product.totalSales || '0'}
              </p>
            </div>
            <div className="w-10 h-10 bg-success-50 rounded-lg flex items-center justify-center">
              <Icon name="ShoppingCart" size={20} className="text-success-500" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Icon name="TrendingUp" size={14} className="text-success-500 mr-1" />
            <span className="text-success-500">+8.2%</span>
            <span className="text-text-secondary ml-1">
              {currentLanguage === 'hi' ? 'पिछले सप्ताह से' : 'from last week'}
            </span>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">
                {currentLanguage === 'hi' ? 'रूपांतरण दर' : 'Conversion Rate'}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {conversionRate}%
              </p>
            </div>
            <div className="w-10 h-10 bg-accent-50 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-accent" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Icon name="TrendingDown" size={14} className="text-error-500 mr-1" />
            <span className="text-error-500">-2.1%</span>
            <span className="text-text-secondary ml-1">
              {currentLanguage === 'hi' ? 'पिछले सप्ताह से' : 'from last week'}
            </span>
          </div>
        </div>

        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">
                {currentLanguage === 'hi' ? 'औसत ऑर्डर वैल्यू' : 'Avg Order Value'}
              </p>
              <p className="text-2xl font-bold text-text-primary">
                {formatPrice(avgOrderValue)}
              </p>
            </div>
            <div className="w-10 h-10 bg-warning-50 rounded-lg flex items-center justify-center">
              <Icon name="DollarSign" size={20} className="text-warning-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <Icon name="TrendingUp" size={14} className="text-success-500 mr-1" />
            <span className="text-success-500">+5.7%</span>
            <span className="text-text-secondary ml-1">
              {currentLanguage === 'hi' ? 'पिछले सप्ताह से' : 'from last week'}
            </span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views and Sales Trend */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {currentLanguage === 'hi' ? 'व्यूज और बिक्री ट्रेंड' : 'Views & Sales Trend'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#003366" 
                  strokeWidth={2}
                  name={currentLanguage === 'hi' ? 'व्यूज' : 'Views'}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#00B4C6" 
                  strokeWidth={2}
                  name={currentLanguage === 'hi' ? 'बिक्री' : 'Sales'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-surface rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            {currentLanguage === 'hi' ? 'ट्रैफिक स्रोत' : 'Traffic Sources'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm text-text-primary">{source.name}</span>
                </div>
                <span className="text-sm font-medium text-text-primary">
                  {source.value}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          {currentLanguage === 'hi' ? 'प्रदर्शन अंतर्दृष्टि' : 'Performance Insights'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-success-50 rounded-lg border border-success-200">
            <div className="flex items-start">
              <Icon name="TrendingUp" size={20} className="text-success-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-success-800">
                  {currentLanguage === 'hi' ? 'बेहतर प्रदर्शन' : 'Strong Performance'}
                </h4>
                <p className="text-sm text-success-700 mt-1">
                  {currentLanguage === 'hi' ?'आपका उत्पाद औसत से 23% बेहतर प्रदर्शन कर रहा है।' :'Your product is performing 23% better than average.'
                  }
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
            <div className="flex items-start">
              <Icon name="AlertTriangle" size={20} className="text-warning-600 mr-3 mt-0.5" />
              <div>
                <h4 className="font-medium text-warning-800">
                  {currentLanguage === 'hi' ? 'सुधार की गुंजाइश' : 'Room for Improvement'}
                </h4>
                <p className="text-sm text-warning-700 mt-1">
                  {currentLanguage === 'hi' ?'बेहतर विवरण से रूपांतरण दर बढ़ सकती है।' :'Better description could improve conversion rate.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductAnalytics;