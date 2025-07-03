import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';


const AnalyticsChart = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [chartType, setChartType] = useState('revenue');
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    const handleLanguageChange = (event) => {
      setCurrentLanguage(event.detail);
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => window.removeEventListener('languageChange', handleLanguageChange);
  }, []);

  const generateMockData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('en-IN', { 
          month: 'short', 
          day: 'numeric' 
        }),
        revenue: Math.floor(Math.random() * 5000) + 1000,
        sales: Math.floor(Math.random() * 20) + 5,
        views: Math.floor(Math.random() * 200) + 50
      });
    }
    
    return data;
  };

  const chartData = generateMockData();

  const chartConfigs = {
    revenue: {
      title: currentLanguage === 'hi' ? 'आय रुझान' : 'Revenue Trend',
      dataKey: 'revenue',
      color: '#10B981',
      icon: 'TrendingUp'
    },
    sales: {
      title: currentLanguage === 'hi' ? 'बिक्री रुझान' : 'Sales Trend',
      dataKey: 'sales',
      color: '#003366',
      icon: 'ShoppingCart'
    },
    views: {
      title: currentLanguage === 'hi' ? 'व्यू रुझान' : 'Views Trend',
      dataKey: 'views',
      color: '#00B4C6',
      icon: 'Eye'
    }
  };

  const timeRangeOptions = [
    { value: '7d', label: currentLanguage === 'hi' ? '7 दिन' : '7 Days' },
    { value: '30d', label: currentLanguage === 'hi' ? '30 दिन' : '30 Days' },
    { value: '90d', label: currentLanguage === 'hi' ? '90 दिन' : '90 Days' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
      const formattedValue = chartType === 'revenue' 
        ? `₹${value.toLocaleString('en-IN')}`
        : value.toLocaleString('en-IN');

      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-text-secondary">{label}</p>
          <p className="text-lg font-semibold text-text-primary">
            {formattedValue}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface rounded-xl border border-border p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <Icon name={chartConfigs[chartType].icon} size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">
              {chartConfigs[chartType].title}
            </h2>
            <p className="text-sm text-text-secondary">
              {currentLanguage === 'hi' ? 'प्रदर्शन विश्लेषण' : 'Performance Analytics'}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          {/* Chart Type Selector */}
          <div className="flex bg-background-secondary rounded-lg p-1">
            {Object.entries(chartConfigs).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setChartType(key)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium spring-transition ${
                  chartType === key
                    ? 'bg-surface text-primary shadow-sm'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                <Icon name={config.icon} size={14} />
                <span className="hidden sm:inline">
                  {config.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Time Range Selector */}
          <div className="flex bg-background-secondary rounded-lg p-1">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setTimeRange(option.value)}
                className={`px-3 py-2 rounded-md text-sm font-medium spring-transition ${
                  timeRange === option.value
                    ? 'bg-surface text-primary shadow-sm'
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80" aria-label={`${chartConfigs[chartType].title} Chart`}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'sales' ? (
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={chartConfigs[chartType].dataKey}
                fill={chartConfigs[chartType].color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={chartConfigs[chartType].dataKey}
                stroke={chartConfigs[chartType].color}
                strokeWidth={3}
                dot={{ fill: chartConfigs[chartType].color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: chartConfigs[chartType].color, strokeWidth: 2 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            ₹{chartData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString('en-IN')}
          </div>
          <div className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ? 'कुल आय' : 'Total Revenue'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {chartData.reduce((sum, item) => sum + item.sales, 0)}
          </div>
          <div className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ? 'कुल बिक्री' : 'Total Sales'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {chartData.reduce((sum, item) => sum + item.views, 0).toLocaleString('en-IN')}
          </div>
          <div className="text-sm text-text-secondary">
            {currentLanguage === 'hi' ? 'कुल व्यू' : 'Total Views'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsChart;