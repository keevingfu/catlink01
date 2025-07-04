import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './store';
import { getMe } from './store/slices/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ContentAnalysis from './pages/ContentAnalysis';
import AudienceInsights from './pages/AudienceInsights';
import AdCampaigns from './pages/AdCampaigns';
import TrendsForecasting from './pages/TrendsForecasting';
import InfluencerAnalysis from './pages/InfluencerAnalysis';
import ContentIntelligence from './pages/ContentIntelligence';
import CrossPlatform from './pages/CrossPlatform';
import BusinessInsights from './pages/BusinessInsights';
import './App.css';
import './final-layout.css';

const { Content } = Layout;
const queryClient = new QueryClient();

// Main App component with authentication
function AppContent() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Try to fetch current user if we have a token
    const authToken = localStorage.getItem('authToken');
    if (authToken && !user) {
      dispatch(getMe());
    }
  }, [dispatch, user]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <Router>
        <Routes>
          {/* Public routes - redirect login to dashboard */}
          <Route path="/login" element={<Navigate to="/dashboard" />} />
          
          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Layout style={{ minHeight: '100vh' }} hasSider>
                  <Sidebar />
                  <Layout>
                    <Header />
                    <Content style={{ margin: '0', padding: '24px', minHeight: 'calc(100vh - 64px)', background: '#f0f2f5' }}>
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/content-analysis" element={<ContentAnalysis />} />
                        <Route path="/audience-insights" element={<AudienceInsights />} />
                        <Route path="/ad-campaigns" element={<AdCampaigns />} />
                        <Route path="/trends" element={<TrendsForecasting />} />
                        <Route path="/influencers" element={<InfluencerAnalysis />} />
                        <Route path="/content-intelligence" element={<ContentIntelligence />} />
                        <Route path="/cross-platform" element={<CrossPlatform />} />
                        <Route path="/business-insights" element={<BusinessInsights />} />
                        <Route path="/unauthorized" element={
                          <div style={{ textAlign: 'center', padding: '50px' }}>
                            <h1>Unauthorized Access</h1>
                            <p>You don't have permission to access this page.</p>
                          </div>
                        } />
                      </Routes>
                    </Content>
                  </Layout>
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

// Root App component with providers
function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;