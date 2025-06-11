import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Select, DatePicker, Space, Statistic, Table, Progress } from 'antd';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlayCircleOutlined, LikeOutlined, CommentOutlined, ShareAltOutlined, EyeOutlined } from '@ant-design/icons';
import VideoPreview from '../../components/VideoPreview';
import MetricCard from '../../components/MetricCard';
import './index.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ContentAnalysis = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);

  // Mock data for demonstration
  const performanceData = [
    { date: '2024-01-01', views: 45000, likes: 3200, comments: 890, shares: 456 },
    { date: '2024-01-02', views: 52000, likes: 3800, comments: 1020, shares: 523 },
    { date: '2024-01-03', views: 48000, likes: 3500, comments: 945, shares: 487 },
    { date: '2024-01-04', views: 61000, likes: 4200, comments: 1230, shares: 612 },
    { date: '2024-01-05', views: 58000, likes: 4100, comments: 1150, shares: 589 },
  ];

  const contentTypeData = [
    { type: 'Tutorial', count: 45, performance: 85 },
    { type: 'Review', count: 38, performance: 78 },
    { type: 'Unboxing', count: 32, performance: 82 },
    { type: 'Lifestyle', count: 28, performance: 75 },
    { type: 'Comparison', count: 22, performance: 88 },
  ];

  const viralElements = [
    { element: 'Pet Appearance', score: 92, frequency: 78 },
    { element: 'Product Demo', score: 88, frequency: 65 },
    { element: 'User Story', score: 85, frequency: 52 },
    { element: 'Before/After', score: 83, frequency: 48 },
    { element: 'Quick Tips', score: 79, frequency: 71 },
  ];

  const contentList = [
    {
      id: 1,
      title: 'Smart Litter Box Setup Guide',
      platform: 'YouTube',
      views: 125000,
      engagement: 8.5,
      roi: 3.2,
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      duration: '3:45',
      comments: 1250,
      shares: 523,
      creator: 'Catlink Tech',
      description: 'Complete setup guide for the Catlink smart litter box',
      hashtags: ['catlink', 'smartpet', 'setup']
    },
    {
      id: 2,
      title: 'Cat Health Monitoring Features',
      platform: 'TikTok',
      views: 89000,
      engagement: 12.3,
      roi: 2.8,
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://www.tiktok.com/@catlink_official/video/7291824681926483201',
      duration: '0:45',
      comments: 892,
      shares: 234,
      creator: '@catlink_official',
      description: 'Quick overview of health monitoring features',
      hashtags: ['cathealth', 'smarttech', 'petcare']
    },
    {
      id: 3,
      title: 'Premium Unboxing Experience',
      platform: 'Instagram',
      views: 56000,
      engagement: 10.2,
      roi: 4.1,
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://www.instagram.com/reel/CyH6F3xIYtR/',
      duration: '1:00',
      comments: 678,
      shares: 189,
      creator: 'Catlink Official',
      description: 'Unboxing the premium Catlink series',
      hashtags: ['unboxing', 'premium', 'catlink']
    },
    {
      id: 4,
      title: 'Detailed Product Review',
      platform: 'Vimeo',
      views: 34000,
      engagement: 9.8,
      roi: 3.5,
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://vimeo.com/123456789',
      duration: '6:30',
      comments: 234,
      shares: 89,
      creator: 'Pet Product Reviews',
      description: 'In-depth review of Catlink smart features',
      hashtags: ['review', 'pettech', 'smartlitter']
    },
    {
      id: 5,
      title: '猫砂盆清洁教程 (Cleaning Tutorial)',
      platform: 'Bilibili',
      views: 178000,
      engagement: 14.5,
      roi: 5.2,
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://www.bilibili.com/video/BV1GJ411x7h7',
      duration: '4:20',
      comments: 2345,
      shares: 1234,
      creator: 'Catlink China',
      description: 'Cleaning and maintenance tutorial for Chinese market',
      hashtags: ['智能猫砂盆', '清洁', '维护']
    },
    {
      id: 6,
      title: 'YouTube Shorts - Quick Tips',
      platform: 'YouTube',
      views: 234000,
      engagement: 16.7,
      roi: 6.8,
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://youtube.com/shorts/abc123def456',
      duration: '0:59',
      comments: 3456,
      shares: 2345,
      creator: 'Catlink Tips',
      description: 'Quick tips for getting the most out of your Catlink',
      hashtags: ['shorts', 'tips', 'catlink']
    }
  ];

  const columns = [
    {
      title: 'Content',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <img src={record.thumbnail} alt={text} style={{ width: 60, height: 45, borderRadius: 4 }} />
          <div>
            <div>{text}</div>
            <small style={{ color: '#888' }}>{record.platform}</small>
          </div>
        </Space>
      ),
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
      render: (val) => val.toLocaleString(),
      sorter: (a, b) => a.views - b.views,
    },
    {
      title: 'Engagement Rate',
      dataIndex: 'engagement',
      key: 'engagement',
      render: (val) => <Progress percent={val * 10} size="small" />,
      sorter: (a, b) => a.engagement - b.engagement,
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      key: 'roi',
      render: (val) => `${val}x`,
      sorter: (a, b) => a.roi - b.roi,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <PlayCircleOutlined 
          style={{ fontSize: 20, color: '#1890ff', cursor: 'pointer' }}
          onClick={() => setSelectedContent(record)}
        />
      ),
    },
  ];

  return (
    <div className="content-analysis">
      <div className="page-header">
        <h1>Content Marketing Analysis</h1>
        <Space>
          <Select value={selectedPlatform} onChange={setSelectedPlatform} style={{ width: 120 }}>
            <Option value="all">All Platforms</Option>
            <Option value="youtube">YouTube</Option>
            <Option value="tiktok">TikTok</Option>
            <Option value="instagram">Instagram</Option>
            <Option value="facebook">Facebook</Option>
          </Select>
          <RangePicker onChange={setDateRange} />
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <MetricCard
            title="Total Views"
            value="2.5M"
            prefix={<EyeOutlined />}
            trend={12.5}
            period="vs last month"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Engagement Rate"
            value="8.7%"
            prefix={<LikeOutlined />}
            trend={5.2}
            period="vs last month"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Total Comments"
            value="45.2K"
            prefix={<CommentOutlined />}
            trend={-2.3}
            period="vs last month"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Share Rate"
            value="3.4%"
            prefix={<ShareAltOutlined />}
            trend={8.9}
            period="vs last month"
          />
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
        <TabPane tab="Performance Trends" key="1">
          <Card>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="views" stroke="#1890ff" name="Views" />
                <Line type="monotone" dataKey="likes" stroke="#52c41a" name="Likes" />
                <Line type="monotone" dataKey="comments" stroke="#faad14" name="Comments" />
                <Line type="monotone" dataKey="shares" stroke="#f5222d" name="Shares" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabPane>

        <TabPane tab="Content Type Analysis" key="2">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Content Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={contentTypeData}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      {contentTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'][index]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Performance by Type">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={contentTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="performance" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Viral Elements" key="3">
          <Card title="Creative Elements Impact">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={viralElements} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="element" type="category" width={120} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#1890ff" name="Virality Score" />
                <Bar dataKey="frequency" fill="#52c41a" name="Usage Frequency" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabPane>

        <TabPane tab="Content Library" key="4">
          <Card>
            <Table
              columns={columns}
              dataSource={contentList}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {selectedContent && (
        <VideoPreview
          visible={!!selectedContent}
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
};

export default ContentAnalysis;