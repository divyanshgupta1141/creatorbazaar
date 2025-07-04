import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Icon from '../../../components/AppIcon';

const SalesPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [timeRange, setTimeRange] = useState('7d');
  const [salesData, setSalesData] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);

    // Mock sales data
    const mockSalesData = [
      { date: '01/12', sales: 5, revenue: 12500 },
      { date: '02/12', sales: 8, revenue: 19600 },
      { date: '03/12', sales: 3, revenue: 7400 },
      { date: '04/12', sales: 12, revenue: 28800 },
      { date: '05/12', sales: 7, revenue: 16800 },
      { date: '06/12', sales: 15, revenue: 35200 },
      { date: '07/12', sales: 9, revenue: 21600 }
    ];
    setSalesData(mockSalesData);

    // Mock transaction data
    const mockTransactions = [
      {
        id: 'TXN001',
        productTitle: 'Digital Marketing Course',
        customer: 'customer@example.com',
        amount: 1999,
        status: 'completed',
        date: '2024-01-15T10:30:00Z',
        paymentMethod: 'UPI'
      },
      {
        id: 'TXN002',
        productTitle: 'Design Templates Bundle',
        customer: 'user@example.com',
        amount: 799,
        status: 'completed',
        date: '2024-01-15T09:15:00Z',
        paymentMethod: 'Card'
      },
      {
        id: 'TXN003',
        productTitle: 'SEO Guide PDF',
        customer: 'buyer@example.com',
        amount: 499,
        status: 'pending',
        date: '2024-01-15T08:45:00Z',
        paymentMethod: 'UPI'
      }
    ];
    setTransactions(mockTransactions);
  }, []);

  const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const avgOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      <Helmet>
        <title>Sales - CreatorBazaar Dashboard</title>
      </Helmet>

      <DashboardLayout currentPage="sales">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Sales Overview</h1>
              <p className="text-white/60">Track your sales performance and transactions</p>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 bg-dark-surface border border-white/20 rounded-lg text-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/60 text-sm">Total Revenue</div>
                  <div className="text-2xl font-bold text-highlight">
                    {formatCurrency(totalRevenue)}
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="DollarSign" size={24} className="text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/60 text-sm">Total Sales</div>
                  <div className="text-2xl font-bold text-white">
                    {totalSales}
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="ShoppingCart" size={24} className="text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white/60 text-sm">Avg Order Value</div>
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(avgOrderValue)}
                  </div>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-purple-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
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
                      dataKey="revenue" 
                      stroke="#FFD166" 
                      strokeWidth={3}
                      dot={{ fill: '#FFD166', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sales Chart */}
            <div className="bg-dark-surface rounded-lg p-6 border border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4">Sales Volume</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
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
                    <Bar 
                      dataKey="sales" 
                      fill="#00B4C6" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-dark-surface rounded-lg border border-white/10">
            <div className="p-6 border-b border-white/10">
              <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            </div>
            <div className="divide-y divide-white/10">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Icon name="ShoppingCart" size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{transaction.productTitle}</div>
                        <div className="text-white/60 text-sm">{transaction.customer}</div>
                        <div className="text-white/40 text-xs">
                          {new Date(transaction.date).toLocaleDateString()} • {transaction.paymentMethod}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        {formatCurrency(transaction.amount)}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
};

export default SalesPage;