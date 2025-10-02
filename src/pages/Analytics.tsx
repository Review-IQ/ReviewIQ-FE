import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Star,
  MessageSquare,
  Calendar,
  Download
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface AnalyticsData {
  overview: {
    totalReviews: number;
    avgRating: number;
    reviewGrowth: number;
    responseRate: number;
    avgResponseTime: number;
  };
  reviewsTrend: {
    date: string;
    reviews: number;
    rating: number;
  }[];
  platformDistribution: {
    platform: string;
    count: number;
    avgRating: number;
  }[];
  sentimentBreakdown: {
    sentiment: string;
    count: number;
    percentage: number;
  }[];
  ratingDistribution: {
    rating: number;
    count: number;
  }[];
  topKeywords: {
    word: string;
    positive: number;
    negative: number;
  }[];
}

export function Analytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30days');

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      const mockData: AnalyticsData = {
        overview: {
          totalReviews: 1247,
          avgRating: 4.3,
          reviewGrowth: 12.5,
          responseRate: 87.3,
          avgResponseTime: 4.2
        },
        reviewsTrend: [
          { date: '2024-01', reviews: 95, rating: 4.2 },
          { date: '2024-02', reviews: 102, rating: 4.1 },
          { date: '2024-03', reviews: 118, rating: 4.3 },
          { date: '2024-04', reviews: 125, rating: 4.4 },
          { date: '2024-05', reviews: 134, rating: 4.3 },
          { date: '2024-06', reviews: 142, rating: 4.5 }
        ],
        platformDistribution: [
          { platform: 'Google', count: 542, avgRating: 4.5 },
          { platform: 'Yelp', count: 389, avgRating: 4.2 },
          { platform: 'Facebook', count: 316, avgRating: 4.1 }
        ],
        sentimentBreakdown: [
          { sentiment: 'Positive', count: 856, percentage: 68.6 },
          { sentiment: 'Neutral', count: 267, percentage: 21.4 },
          { sentiment: 'Negative', count: 124, percentage: 10.0 }
        ],
        ratingDistribution: [
          { rating: 5, count: 567 },
          { rating: 4, count: 423 },
          { rating: 3, count: 156 },
          { rating: 2, count: 67 },
          { rating: 1, count: 34 }
        ],
        topKeywords: [
          { word: 'service', positive: 234, negative: 12 },
          { word: 'food', positive: 198, negative: 23 },
          { word: 'atmosphere', positive: 167, negative: 8 },
          { word: 'price', positive: 89, negative: 45 },
          { word: 'staff', positive: 156, negative: 15 }
        ]
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];

  const exportData = () => {
    // TODO: Implement CSV export
    alert('Export functionality coming soon!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Failed to load analytics data</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary-600" />
            Analytics Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Insights and trends from your business reviews
          </p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="1year">Last Year</option>
          </select>
          <button
            onClick={exportData}
            className="btn-primary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="w-8 h-8 text-blue-600" />
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              {analyticsData.overview.reviewGrowth}%
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Reviews</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {analyticsData.overview.totalReviews.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8 text-yellow-500 fill-current" />
          </div>
          <p className="text-sm text-gray-600">Average Rating</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {analyticsData.overview.avgRating.toFixed(1)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Response Rate</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {analyticsData.overview.responseRate}%
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600">Avg Response Time</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {analyticsData.overview.avgResponseTime}h
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Growth Rate</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            +{analyticsData.overview.reviewGrowth}%
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Reviews Trend */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Reviews Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.reviewsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="reviews"
                stroke="#0284c7"
                strokeWidth={2}
                name="Review Count"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rating"
                stroke="#f59e0b"
                strokeWidth={2}
                name="Avg Rating"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.ratingDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#0284c7" name="Reviews" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analyticsData.platformDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="platform" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#0284c7" name="Reviews" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sentiment Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.sentimentBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ sentiment, percentage }) => `${sentiment}: ${percentage}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {analyticsData.sentimentBreakdown.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Keywords in Reviews</h2>
        <div className="space-y-4">
          {analyticsData.topKeywords.map((keyword) => {
            const total = keyword.positive + keyword.negative;
            const positivePercent = (keyword.positive / total) * 100;
            const negativePercent = (keyword.negative / total) * 100;

            return (
              <div key={keyword.word}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 capitalize">
                    {keyword.word}
                  </span>
                  <span className="text-sm text-gray-600">
                    {total} mentions
                  </span>
                </div>
                <div className="flex w-full h-6 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${positivePercent}%` }}
                  >
                    {keyword.positive > 0 && `${keyword.positive}`}
                  </div>
                  <div
                    className="bg-red-500 flex items-center justify-center text-xs text-white font-medium"
                    style={{ width: `${negativePercent}%` }}
                  >
                    {keyword.negative > 0 && `${keyword.negative}`}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Performance Details */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Platform
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Reviews
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.platformDistribution.map((platform) => (
                <tr key={platform.platform}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">
                        {platform.platform}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{platform.count}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-900">
                        {platform.avgRating.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        +{Math.floor(Math.random() * 20)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
