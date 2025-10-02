import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Users as UsersIcon, Lightbulb, FileText, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

export function AIInsights() {
  const [businessId] = useState(1); // TODO: Get from context/state
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(30);

  const [analyticsInsights, setAnalyticsInsights] = useState<string>('');
  const [competitorInsights, setCompetitorInsights] = useState<string>('');
  const [reviewSummary, setReviewSummary] = useState<{ summary: string; reviewCount: number; period: string } | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    loadInsights();
  }, [selectedPeriod]);

  const loadInsights = async () => {
    try {
      setLoading(true);

      // Load all AI insights in parallel
      const [analytics, competitors, summary, recs] = await Promise.all([
        api.getAnalyticsInsights(businessId),
        api.getCompetitorInsights(businessId),
        api.getReviewSummary(businessId, selectedPeriod),
        api.getActionableRecommendations(businessId)
      ]);

      setAnalyticsInsights(analytics.data.insights);
      setCompetitorInsights(competitors.data.insights);
      setReviewSummary(summary.data);
      setRecommendations(recs.data.recommendations);
    } catch (error) {
      console.error('Error loading AI insights:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshInsights = async () => {
    setRefreshing(true);
    await loadInsights();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Generating AI insights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              AI Insights
            </h1>
            <p className="mt-2 text-gray-600">
              AI-powered analysis and recommendations for your business
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(Number(e.target.value))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={90}>Last 90 days</option>
            </select>
            <button
              onClick={refreshInsights}
              disabled={refreshing}
              className="btn-primary flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Review Summary */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Review Summary</h2>
              {reviewSummary && (
                <p className="text-sm text-gray-500">
                  Based on {reviewSummary.reviewCount} reviews from the {reviewSummary.period}
                </p>
              )}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-line">{reviewSummary?.summary || 'No reviews available for analysis.'}</p>
          </div>
        </div>

        {/* Analytics Insights */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Analytics Insights</h2>
              <p className="text-sm text-gray-500">Performance analysis and trends</p>
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-line">{analyticsInsights}</p>
          </div>
        </div>

        {/* Competitor Insights */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Competitive Analysis</h2>
              <p className="text-sm text-gray-500">Your position in the market</p>
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-line">{competitorInsights}</p>
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Actionable Recommendations</h2>
              <p className="text-sm text-gray-500">Data-driven suggestions to improve your business</p>
            </div>
          </div>
          <div className="space-y-3">
            {recommendations.length > 0 ? (
              recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 flex-1">{rec}</p>
                </div>
              ))
            ) : (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-gray-500 text-center">No recommendations available. Gather more reviews to get AI-powered insights.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">Powered by OpenAI GPT-4</h3>
            <p className="text-sm text-gray-600">
              These insights are generated using advanced AI to analyze your reviews, analytics, and competitive data.
              The recommendations are tailored specifically to your business based on real customer feedback and market trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
