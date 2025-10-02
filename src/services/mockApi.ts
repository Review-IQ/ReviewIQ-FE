import {
  mockUser,
  mockBusinesses,
  mockReviews,
  mockPlatforms,
  mockCustomers,
  mockCampaigns,
  mockCompetitors,
  mockAnalytics
} from './mockData';

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

class MockApiService {
  // Auth endpoints
  async register(data: { email: string; fullName: string }) {
    await delay();
    console.log('[MOCK API] Register:', data);
    return { data: { user: mockUser, message: 'Registration successful' } };
  }

  async getCurrentUser() {
    await delay();
    console.log('[MOCK API] Get current user');
    return { data: mockUser };
  }

  async updateProfile(data: { fullName?: string; email?: string }) {
    await delay();
    console.log('[MOCK API] Update profile:', data);
    return { data: { ...mockUser, ...data } };
  }

  // Business endpoints
  async getBusinesses() {
    await delay();
    console.log('[MOCK API] Get businesses');
    return { data: mockBusinesses };
  }

  async getBusiness(id: number) {
    await delay();
    console.log('[MOCK API] Get business:', id);
    const business = mockBusinesses.find(b => b.id === id);
    if (!business) throw new Error('Business not found');
    return { data: business };
  }

  async createBusiness(data: any) {
    await delay();
    console.log('[MOCK API] Create business:', data);
    const newBusiness = {
      id: mockBusinesses.length + 1,
      ...data,
      platformConnectionsCount: 0,
      reviewsCount: 0,
      avgRating: 0,
      createdAt: new Date().toISOString()
    };
    return { data: newBusiness };
  }

  async updateBusiness(id: number, data: any) {
    await delay();
    console.log('[MOCK API] Update business:', id, data);
    const business = mockBusinesses.find(b => b.id === id);
    if (!business) throw new Error('Business not found');
    return { data: { ...business, ...data } };
  }

  async deleteBusiness(id: number) {
    await delay();
    console.log('[MOCK API] Delete business:', id);
    return { data: { message: 'Business deleted successfully' } };
  }

  // Reviews endpoints
  async getReviews(params?: any) {
    await delay();
    console.log('[MOCK API] Get reviews:', params);

    let filteredReviews = [...mockReviews];

    if (params?.businessId) {
      filteredReviews = filteredReviews.filter(r => r.businessId === params.businessId);
    }
    if (params?.platform) {
      filteredReviews = filteredReviews.filter(r => r.platform === params.platform);
    }
    if (params?.sentiment) {
      filteredReviews = filteredReviews.filter(r => r.sentiment === params.sentiment);
    }
    if (params?.rating) {
      filteredReviews = filteredReviews.filter(r => r.rating === params.rating);
    }
    if (params?.isRead !== undefined) {
      filteredReviews = filteredReviews.filter(r => r.isRead === params.isRead);
    }
    if (params?.isFlagged !== undefined) {
      filteredReviews = filteredReviews.filter(r => r.isFlagged === params.isFlagged);
    }

    return { data: filteredReviews };
  }

  async getReview(id: number) {
    await delay();
    console.log('[MOCK API] Get review:', id);
    const review = mockReviews.find(r => r.id === id);
    if (!review) throw new Error('Review not found');
    return { data: review };
  }

  async replyToReview(id: number, responseText: string) {
    await delay();
    console.log('[MOCK API] Reply to review:', id, responseText);
    return { data: { message: 'Reply posted successfully' } };
  }

  async markReviewAsRead(id: number, isRead: boolean) {
    await delay();
    console.log('[MOCK API] Mark review as read:', id, isRead);
    return { data: { message: 'Review updated' } };
  }

  async flagReview(id: number, isFlagged: boolean) {
    await delay();
    console.log('[MOCK API] Flag review:', id, isFlagged);
    return { data: { message: 'Review flagged' } };
  }

  // Integrations endpoints
  async getAvailablePlatforms() {
    await delay();
    console.log('[MOCK API] Get available platforms');
    return { data: mockPlatforms };
  }

  async getBusinessConnections(businessId: number) {
    await delay();
    console.log('[MOCK API] Get business connections:', businessId);
    return { data: mockPlatforms.filter(p => p.isConnected) };
  }

  async initiateConnection(platform: string, businessId: number) {
    await delay();
    console.log('[MOCK API] Initiate connection:', platform, businessId);
    return { data: { authUrl: '#demo-mode', message: 'Demo mode - connection simulated' } };
  }

  async disconnectPlatform(connectionId: number) {
    await delay();
    console.log('[MOCK API] Disconnect platform:', connectionId);
    return { data: { message: 'Platform disconnected' } };
  }

  async syncPlatform(connectionId: number) {
    await delay();
    console.log('[MOCK API] Sync platform:', connectionId);
    return { data: { message: 'Sync completed', reviewsImported: 12 } };
  }

  // Analytics endpoints
  async getAnalytics(_params?: any) {
    await delay();
    console.log('[MOCK API] Get analytics:', _params);
    return { data: mockAnalytics };
  }

  async getDashboardSummary(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get dashboard summary:', _businessId);
    return {
      data: {
        totalReviews: 269,
        averageRating: 4.5,
        unreadReviews: 12,
        connectedPlatforms: 3,
        smsUsage: {
          sent: 7,
          limit: 10,
          remaining: 3
        },
        subscriptionPlan: 'Free',
        recentReviews: mockReviews.slice(0, 5).map(r => ({
          id: r.id,
          platform: r.platform,
          reviewerName: r.reviewerName,
          rating: r.rating,
          reviewDate: r.reviewDate
        }))
      }
    };
  }

  async getPlatformBreakdown(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get platform breakdown:', _businessId);
    return {
      data: {
        platformBreakdown: [
          {
            platform: 'Google',
            totalReviews: 125,
            averageRating: 4.6,
            positiveCount: 95,
            neutralCount: 22,
            negativeCount: 8
          },
          {
            platform: 'Yelp',
            totalReviews: 82,
            averageRating: 4.4,
            positiveCount: 61,
            neutralCount: 16,
            negativeCount: 5
          },
          {
            platform: 'Facebook',
            totalReviews: 62,
            averageRating: 4.5,
            positiveCount: 48,
            neutralCount: 11,
            negativeCount: 3
          }
        ]
      }
    };
  }

  async getAnalyticsOverview(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get analytics overview:', _businessId);
    return {
      data: {
        totalReviews: 269,
        averageRating: 4.5,
        responseRate: 78,
        sentimentBreakdown: {
          positive: 204,
          neutral: 49,
          negative: 16
        },
        thisMonthReviews: 38,
        monthlyChange: 12.5
      }
    };
  }

  // POS Automation / SMS endpoints
  async getCustomers(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get customers:', _businessId);
    return { data: mockCustomers };
  }

  async getCampaigns(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get campaigns:', _businessId);
    return { data: mockCampaigns };
  }

  async createCampaign(data: any) {
    await delay(500);
    console.log('[MOCK API] Create campaign:', data);
    const newCampaign = {
      id: mockCampaigns.length + 1,
      ...data,
      status: 'Scheduled',
      recipientCount: 0,
      responseRate: null
    };
    return { data: newCampaign };
  }

  async sendMessage(data: any) {
    await delay(500);
    console.log('[MOCK API] Send message:', data);
    return { data: { message: 'Messages sent successfully', sentCount: data.customerIds.length } };
  }

  // Competitors endpoints
  async getCompetitors(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get competitors:', _businessId);
    return { data: mockCompetitors };
  }

  async addCompetitor(data: any) {
    await delay();
    console.log('[MOCK API] Add competitor:', data);
    const newCompetitor = {
      id: mockCompetitors.length + 1,
      ...data,
      averageRating: 0,
      totalReviews: 0,
      recentReviewsCount: 0,
      lastUpdated: new Date().toISOString()
    };
    return { data: newCompetitor };
  }

  async removeCompetitor(id: number) {
    await delay();
    console.log('[MOCK API] Remove competitor:', id);
    return { data: { message: 'Competitor removed' } };
  }

  // Notifications endpoints
  async getNotifications(params?: { unreadOnly?: boolean; page?: number; pageSize?: number }) {
    await delay();
    console.log('[MOCK API] Get notifications:', params);

    const mockNotifications = [
      {
        id: 1,
        type: 0,
        title: 'New Google Review',
        message: 'John Smith left a 5-star review',
        data: JSON.stringify({ reviewId: 1, businessId: 1, platform: 'Google' }),
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
        readAt: null
      },
      {
        id: 2,
        type: 2,
        title: '⚠️ Low Rating Alert - Yelp',
        message: 'Jane Doe left a 2-star review',
        data: JSON.stringify({ reviewId: 2, businessId: 1, platform: 'Yelp' }),
        isRead: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        readAt: null
      },
      {
        id: 3,
        type: 0,
        title: 'New Facebook Review',
        message: 'Sarah Johnson left a 4-star review',
        data: JSON.stringify({ reviewId: 3, businessId: 1, platform: 'Facebook' }),
        isRead: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        readAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
      }
    ];

    let filtered = params?.unreadOnly ? mockNotifications.filter(n => !n.isRead) : mockNotifications;

    return {
      data: {
        notifications: filtered,
        totalCount: filtered.length,
        page: params?.page || 1,
        pageSize: params?.pageSize || 50,
        totalPages: 1
      }
    };
  }

  async getUnreadNotificationCount() {
    await delay(100);
    console.log('[MOCK API] Get unread notification count');
    return { data: { count: 2 } };
  }

  async markNotificationAsRead(id: number) {
    await delay();
    console.log('[MOCK API] Mark notification as read:', id);
    return { data: { message: 'Notification marked as read' } };
  }

  async markAllNotificationsAsRead() {
    await delay();
    console.log('[MOCK API] Mark all notifications as read');
    return { data: { message: 'Marked 2 notifications as read' } };
  }

  async deleteNotification(id: number) {
    await delay();
    console.log('[MOCK API] Delete notification:', id);
    return { data: null };
  }

  async getNotificationPreferences() {
    await delay();
    console.log('[MOCK API] Get notification preferences');
    return {
      data: {
        id: 1,
        userId: 1,
        emailNotifications: true,
        pushNotifications: false,
        smsNotifications: false,
        notifyOnNewReview: true,
        notifyOnReviewReply: true,
        notifyOnLowRating: true
      }
    };
  }

  async updateNotificationPreferences(preferences: any) {
    await delay();
    console.log('[MOCK API] Update notification preferences:', preferences);
    return { data: preferences };
  }

  // Team endpoints
  async getTeamMembers(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get team members:', _businessId);
    return {
      data: [
        {
          id: 1,
          userId: 1,
          user: { id: 1, fullName: 'John Doe (You)', email: 'john@example.com' },
          role: 'Owner',
          joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString(),
          isActive: true
        },
        {
          id: 2,
          userId: 2,
          user: { id: 2, fullName: 'Jane Smith', email: 'jane@example.com' },
          role: 'Admin',
          joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90).toISOString(),
          isActive: true
        },
        {
          id: 3,
          userId: 3,
          user: { id: 3, fullName: 'Bob Johnson', email: 'bob@example.com' },
          role: 'Member',
          joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
          isActive: true
        }
      ]
    };
  }

  async getPendingInvitations(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get pending invitations:', _businessId);
    return {
      data: [
        {
          id: 1,
          email: 'newuser@example.com',
          role: 'Member',
          invitedBy: { fullName: 'John Doe' },
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
          status: 0
        }
      ]
    };
  }

  async inviteUser(_businessId: number, email: string, role: string) {
    await delay();
    console.log('[MOCK API] Invite user:', email, role);
    return {
      data: {
        message: 'Invitation sent successfully',
        invitation: {
          id: Date.now(),
          email,
          role,
          createdAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()
        }
      }
    };
  }

  async revokeInvitation(invitationId: number) {
    await delay();
    console.log('[MOCK API] Revoke invitation:', invitationId);
    return { data: { message: 'Invitation revoked successfully' } };
  }

  async removeTeamMember(_businessId: number, userId: number) {
    await delay();
    console.log('[MOCK API] Remove team member:', userId);
    return { data: { message: 'Team member removed successfully' } };
  }

  async updateMemberRole(_businessId: number, userId: number, role: string) {
    await delay();
    console.log('[MOCK API] Update member role:', userId, role);
    return { data: { message: 'Role updated successfully' } };
  }

  // Invitation & Registration endpoints
  async getInvitationDetails(token: string) {
    await delay();
    console.log('[MOCK API] Get invitation details:', token);
    return {
      data: {
        email: 'newuser@example.com',
        businessName: 'Demo Restaurant',
        role: 'Member',
        inviterName: 'John Doe'
      }
    };
  }

  async acceptInvitationAndRegister(token: string, data: any) {
    await delay();
    console.log('[MOCK API] Accept invitation and register:', token, data);
    return { data: { message: 'Registration successful' } };
  }

  // AI endpoints
  async getAnalyticsInsights(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get analytics insights');
    return {
      data: {
        insights: `**Performance Analysis**

Your business is showing strong performance trends with several key highlights:

**Key Metrics:**
• Average rating of 4.5/5 stars demonstrates excellent customer satisfaction
• Response rate of 85% shows good engagement with customer feedback
• Average response time of 2 hours is better than industry standard

**Trends Identified:**
• Review volume increased 23% over the last 30 days
• Positive sentiment up 15% compared to previous period
• Peak review activity occurs on weekends (Friday-Sunday)

**Areas of Concern:**
• 12% of reviews mention wait times - consider staffing adjustments
• Response time to negative reviews averages 6 hours - target under 4 hours

**Growth Opportunities:**
• Strong 5-star reviews indicate satisfied customers - encourage social sharing
• Positive feedback about staff quality - highlight team in marketing
• Weekend traffic is high - consider extended hours or special promotions`
      }
    };
  }

  async getCompetitorInsights(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get competitor insights');
    return {
      data: {
        insights: `**Competitive Position Analysis**

**Your Market Standing:**
Your business currently ranks in the top 25% of local competitors based on customer ratings and review volume.

**Competitive Strengths:**
• Your 4.5-star average is 0.3 stars above market average
• Review response rate of 85% vs competitor average of 62%
• Faster response times give you a competitive edge
• Customer service consistently praised in reviews

**Competitor Benchmarks:**
• Top competitor: "Downtown Bistro" - 4.7 stars (342 reviews)
• Market average: 4.2 stars
• Your business: 4.5 stars (167 reviews)

**Key Differentiators:**
• Competitors struggle with consistency - you excel here
• Your response quality is superior to 78% of competitors
• Unique strength: personalized service (mentioned 45% more often)

**Opportunities to Gain Edge:**
• Increase review volume - you're behind top competitor by 175 reviews
• Promote your faster response times in marketing
• Competitors weak on weekend service - capitalize on this strength
• Consider loyalty program - competitors lack this feature

**Recommendations:**
1. Focus on getting more reviews to boost visibility
2. Highlight your response time advantage
3. Market your weekend reliability
4. Maintain service quality consistency`
      }
    };
  }

  async getReviewSummary(_businessId: number, days: number) {
    await delay();
    console.log('[MOCK API] Get review summary for', days, 'days');
    return {
      data: {
        summary: `**Review Summary - Last ${days} Days**

**Overall Sentiment: Positive** ⭐⭐⭐⭐½

**Key Positive Themes:**
• **Excellent Service (mentioned 67 times)** - Staff consistently praised for friendliness and attentiveness
• **Food Quality (mentioned 54 times)** - Dishes described as "fresh", "delicious", and "perfectly prepared"
• **Atmosphere (mentioned 42 times)** - Ambiance rated as "cozy", "welcoming", and "perfect for dates"
• **Value (mentioned 38 times)** - Customers feel prices are reasonable for quality received

**Common Concerns:**
• **Wait Times (mentioned 18 times)** - Some customers experienced longer waits during peak hours
• **Parking (mentioned 12 times)** - Limited parking availability mentioned by several guests
• **Menu Variety (mentioned 8 times)** - A few requests for more vegetarian/vegan options

**Most Frequent Keywords:**
"Amazing", "Friendly", "Delicious", "Recommend", "Great experience", "Will return"

**Notable Standout Feedback:**
"Best dining experience in the area! The staff went above and beyond to make our anniversary special. The attention to detail and personalized service was exceptional."

**Customer Behavior Patterns:**
• 73% of reviews mention plans to return
• 89% would recommend to friends
• Couples and small groups most common customer type
• Peak positive reviews on Friday/Saturday evenings`,
        reviewCount: 47,
        period: `${days} days`
      }
    };
  }

  async getActionableRecommendations(_businessId: number) {
    await delay();
    console.log('[MOCK API] Get actionable recommendations');
    return {
      data: {
        recommendations: [
          "Respond to all reviews within 24 hours to maintain 90%+ response rate and improve customer engagement",
          "Address wait time concerns by implementing a reservation system or SMS notification when tables are ready",
          "Expand vegetarian and vegan menu options based on 8 customer requests in recent feedback",
          "Create a parking guide or partnership with nearby lots to address the 12 parking-related concerns",
          "Leverage your 67 'excellent service' mentions in marketing campaigns and social media",
          "Train weekend staff to maintain weekday service quality standards based on positive weekend feedback patterns",
          "Implement a loyalty program to encourage repeat visits from the 73% who mention plans to return"
        ]
      }
    };
  }
}

export const mockApi = new MockApiService();
