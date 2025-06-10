import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Content APIs
export const contentAPI = {
  getAll: (params) => api.get('/content', { params }),
  getById: (id) => api.get(`/content/${id}`),
  getPerformance: (params) => api.get('/content/performance', { params }),
  getPerformanceTrends: (params) => api.get('/content/performance/trends', { params }),
  getPlatformComparison: (params) => api.get('/content/performance/comparison', { params }),
  getROI: (params) => api.get('/content/roi', { params }),
  getCreativeElements: (params) => api.get('/content/creative-elements', { params }),
  getVideoPreview: (id) => api.get(`/content/${id}/preview`),
};

// Audience APIs
export const audienceAPI = {
  getPersonas: () => api.get('/audience/personas'),
  getPersonaDetails: (id) => api.get(`/audience/personas/${id}`),
  getContentAffinity: (params) => api.get('/audience/content-affinity', { params }),
  getSentimentAnalysis: (params) => api.get('/audience/sentiment', { params }),
  getCommentTopics: (params) => api.get('/audience/comment-topics', { params }),
};

// Campaign APIs
export const campaignAPI = {
  getAll: (params) => api.get('/campaigns', { params }),
  getById: (id) => api.get(`/campaigns/${id}`),
  getPerformance: (id) => api.get(`/campaigns/${id}/performance`),
  createCampaign: (data) => api.post('/campaigns', data),
  updateCampaign: (id, data) => api.put(`/campaigns/${id}`, data),
  getTargetAudience: (id) => api.get(`/campaigns/${id}/target-audience`),
};

// Trends APIs
export const trendsAPI = {
  getTrends: (params) => api.get('/trends', { params }),
  getKeywords: (params) => api.get('/trends/keywords', { params }),
  getKeywordTrends: (keyword) => api.get(`/trends/keywords/${keyword}/trends`),
  getPredictions: (params) => api.get('/trends/predictions', { params }),
};

// Influencer APIs
export const influencerAPI = {
  getAll: (params) => api.get('/influencers', { params }),
  getById: (id) => api.get(`/influencers/${id}`),
  getPerformance: (id) => api.get(`/influencers/${id}/performance`),
  getSelfKOC: () => api.get('/influencers/self-koc'),
};

// Analytics APIs
export const analyticsAPI = {
  getContentFeatures: (params) => api.get('/analytics/content-features', { params }),
  getContentClusters: (params) => api.get('/analytics/content-clusters', { params }),
  getVideoAnalysis: (id) => api.get(`/analytics/video/${id}`),
  getCrossPlatform: (params) => api.get('/analytics/cross-platform', { params }),
};

// Dashboard APIs
export const dashboardAPI = {
  getKPIs: (params) => api.get('/dashboard/kpis', { params }),
  getInsights: (params) => api.get('/dashboard/insights', { params }),
  getAlerts: () => api.get('/dashboard/alerts'),
  getRecommendations: () => api.get('/dashboard/recommendations'),
};

export default api;