import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Icon from '../../../components/AppIcon';

const AnalyticsPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [analyticsData, setAnalyticsData] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Mock analytics data
    const mockData = {
      overview: {
        totalViews: 15420,
        totalSales: 156,
        conversionRate: 1.01,
        totalRevenue: 311844
      },
      trafficSources: [
        { name: 'Direct', value: 45, color: '#005F6B' },
        { name: 'Social Media', value: 30, color: '#00B4C6' },
        { name: 'Referral', value: 15, color: '#FFD166' },
        { name: 'Search', value: 10, color: '#FF6B6B' }
      ],
      dailyViews: [
        { date: '01/12', views: 450, sales: 12 },
        { date: '02/12', views: 620, sales: 18 },
        { date: '03/12', views: 380, sales: 8 },
        { date: '04/12', views: 780, sales: 25 },
        { date: '05/12', views: 950, sales: 32 },
        { date: '06/12', views: 670, sales: 19 },
        { date: '07/12', views: 890, sales: 28 }
      ],
      topProducts: [
        { name: 'Digital Marketing Course', views: 3420, sales: 45, revenue: 89550 },
        { name: 'Design Templates Bundle', views: 2100, sales: 32, revenue: 25568 },
        { name: 'SEO Guide PDF', views: 1890, sales: 28, revenue: 13972 },
        { name: 'Social Media Kit', views: 1650, sales: 22, revenue: 10978 }
      ]
    };
    setAnalyticsData(mockData);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  if (!analyticsData.overview) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Analytics - CreatorBazaar Dashboard</title>
      </Helmet>

      <DashboardLayout currentPage="analytics">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-white/60">Detailed insights into your performance</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/60 text-sm">Total Views</div>
                  <div className="text-2xl font-bold text-white">
                    {analyticsData.overview.totalViews.toLocaleString()}
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="Eye" size={24} className="text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <Icon name="TrendingUp" size={16} className="mr-1" />
                +12.5% from last week
              </div>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/60 text-sm">Total Sales</div>
                  <div className="text-2xl font-bold text-white">
                    {analyticsData.overview.totalSales}
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingCart" size={24} className="text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <Icon name="TrendingUp" size={16} className="mr-1" />
                +8.3% from last week
              </div>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/60 text-sm">Conversion Rate</div>
                  <div className="text-2xl font-bold text-white">
                    {analyticsData.overview.conversionRate}%
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="Target" size={24} className="text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-red-400 text-sm">
                <Icon name="TrendingDown" size={16} className="mr-1" />
                -2.1% from last week
              </div>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/60 text-sm">Total Revenue</div>
                  <div className="text-2xl font-bold text-highlight">
                    {formatCurrency(analyticsData.overview.totalRevenue)}
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={24} className="text-yellow-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <Icon name="TrendingUp" size={16} className="mr-1" />
                +15.2% from last week
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Views and Sales Trend */}
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Views & Sales Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.dailyViews}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis dataKey="date" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#0A3A52',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="views" 
                      stroke="#00B4C6" 
                      strokeWidth={2}
                      name="Views"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#FFD166" 
                      strokeWidth={2}
                      name="Sales"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Traffic Sources</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.trafficSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {analyticsData.trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: '#0A3A52',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {analyticsData.trafficSources.map((source, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: source.color }}
                      />
                      <span className="text-white text-sm">{source.name}</span>
                    </div>
                    <span className="text-white font-medium">{source.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-dark-surface rounded-lg border border-white/10">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Top Performing Products</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-bg">
                  <tr>
                    <th className="text-left text-white/60 text-sm font-medium p-4">Product</th>
                    <th className="text-left text-white/60 text-sm font-medium p-4">Views</th>
                    <th className="text-left text-white/60 text-sm font-medium p-4">Sales</th>
                    <th className="text-left text-white/60 text-sm font-medium p-4">Revenue</th>
                    <th className="text-left text-white/60 text-sm font-medium p-4">Conversion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {analyticsData.topProducts.map((product, index) => {
                    const conversionRate = ((product.sales / product.views) * 100).toFixed(2);
                    return (
                      <tr key={index}>
                        <td className="p-4">
                          <div className="text-white font-medium">{product.name}</div>
                        </td>
                        <td className="p-4 text-white/80">{product.views.toLocaleString()}</td>
                        <td className="p-4 text-white/80">{product.sales}</td>
                        <td className="p-4 text-highlight font-medium">
                          {formatCurrency(product.revenue)}
                        </td>
                        <td className="p-4 text-white/80">{conversionRate}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default AnalyticsPage;