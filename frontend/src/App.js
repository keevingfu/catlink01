import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import store from './store';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
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

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 8,
            },
          }}
        >
          <Router>
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
                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </Router>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;