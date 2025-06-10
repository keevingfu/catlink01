import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Select, DatePicker, Space, Tag, Table, Progress, Statistic, Button, Tooltip, Timeline, Alert, Badge, Divider } from 'antd';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Sankey } from 'recharts';
import { 
  PlayCircleOutlined, 
  YoutubeOutlined,
  InstagramOutlined,
  TwitterOutlined,
  FacebookOutlined,
  GlobalOutlined,
  SyncOutlined,
  RiseOutlined,
  ShareAltOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  BulbOutlined,
  BarChartOutlined,
  LineChartOutlined,
  DotChartOutlined,
  FundOutlined,
  RocketOutlined,
  CalendarOutlined,
  TeamOutlined,
  EyeOutlined,
  HeartOutlined,
  CommentOutlined,
  SendOutlined
} from '@ant-design/icons';
import VideoPreview from '../../components/VideoPreview';
import MetricCard from '../../components/MetricCard';
import './index.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const CrossPlatform = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [comparisonMode, setComparisonMode] = useState('performance');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['all']);

  // Platform performance comparison data
  const platformComparisonData = [
    { platform: 'YouTube', views: 2500000, engagement: 8.5, shareRate: 3.2, avgWatchTime: 185 },
    { platform: 'TikTok', views: 4200000, engagement: 15.3, shareRate: 7.8, avgWatchTime: 45 },
    { platform: 'Instagram', views: 1800000, engagement: 12.1, shareRate: 5.4, avgWatchTime: 35 },
    { platform: 'Facebook', views: 1200000, engagement: 6.8, shareRate: 2.9, avgWatchTime: 95 },
  ];

  // Cross-platform content performance
  const contentPerformanceData = [
    {
      id: 1,
      title: 'Smart Litter Box Unboxing & Setup',
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://example.com/video1.mp4',
      platforms: {
        youtube: { views: 125000, engagement: 8.5, shares: 3200 },
        tiktok: { views: 450000, engagement: 18.2, shares: 15600 },
        instagram: { views: 89000, engagement: 14.3, shares: 4500 },
        facebook: { views: 56000, engagement: 6.2, shares: 1200 }
      },
      totalReach: 720000,
      viralScore: 89,
      bestPlatform: 'TikTok',
      duration: '2:45',
      publishDate: '2024-01-15',
      hashtags: ['smartpet', 'cattech', 'unboxing'],
      description: 'Complete unboxing and setup guide for the smart litter box'
    },
    {
      id: 2,
      title: 'Cat Reaction Compilation',
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://example.com/video2.mp4',
      platforms: {
        youtube: { views: 89000, engagement: 7.2, shares: 2100 },
        tiktok: { views: 680000, engagement: 22.5, shares: 28900 },
        instagram: { views: 156000, engagement: 16.8, shares: 8900 },
        facebook: { views: 34000, engagement: 5.1, shares: 890 }
      },
      totalReach: 959000,
      viralScore: 94,
      bestPlatform: 'TikTok',
      duration: '0:58',
      publishDate: '2024-01-18',
      hashtags: ['catsoftiktok', 'funnycat', 'reaction'],
      description: 'Hilarious compilation of cats discovering the smart litter box'
    },
    {
      id: 3,
      title: 'Health Monitoring Tutorial',
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://example.com/video3.mp4',
      platforms: {
        youtube: { views: 178000, engagement: 9.8, shares: 4500 },
        tiktok: { views: 125000, engagement: 13.2, shares: 6700 },
        instagram: { views: 98000, engagement: 11.5, shares: 3400 },
        facebook: { views: 78000, engagement: 7.9, shares: 2300 }
      },
      totalReach: 479000,
      viralScore: 78,
      bestPlatform: 'YouTube',
      duration: '4:20',
      publishDate: '2024-01-20',
      hashtags: ['pethealth', 'tutorial', 'smarttech'],
      description: 'Detailed tutorial on using health monitoring features'
    }
  ];

  // Platform-specific best practices
  const platformBestPractices = [
    {
      platform: 'YouTube',
      icon: <YoutubeOutlined style={{ fontSize: 24, color: '#FF0000' }} />,
      bestTime: '2-4 PM EST',
      optimalLength: '8-12 minutes',
      keyMetrics: ['Watch Time', 'CTR', 'Retention'],
      tips: ['Use detailed thumbnails', 'Add chapters', 'Optimize descriptions']
    },
    {
      platform: 'TikTok',
      icon: <img src="/api/placeholder/24/24" alt="TikTok" style={{ borderRadius: 4 }} />,
      bestTime: '6-10 AM & 7-11 PM',
      optimalLength: '15-60 seconds',
      keyMetrics: ['Completion Rate', 'Shares', 'Comments'],
      tips: ['Hook in first 3 seconds', 'Use trending sounds', 'Vertical format only']
    },
    {
      platform: 'Instagram',
      icon: <InstagramOutlined style={{ fontSize: 24, color: '#E4405F' }} />,
      bestTime: '11 AM - 1 PM',
      optimalLength: '30s Reels, 60s Feed',
      keyMetrics: ['Reach', 'Saves', 'Profile Visits'],
      tips: ['Use Reels for discovery', 'Add location tags', 'Engage with comments']
    },
    {
      platform: 'Facebook',
      icon: <FacebookOutlined style={{ fontSize: 24, color: '#1877F2' }} />,
      bestTime: '1-3 PM',
      optimalLength: '1-2 minutes',
      keyMetrics: ['Engagement Rate', 'Shares', 'Reactions'],
      tips: ['Native video uploads', 'Add captions', 'Create shareable content']
    }
  ];

  // Content propagation flow data
  const propagationData = [
    { source: 'TikTok', target: 'Instagram', value: 35 },
    { source: 'TikTok', target: 'YouTube', value: 25 },
    { source: 'Instagram', target: 'Facebook', value: 20 },
    { source: 'YouTube', target: 'Facebook', value: 15 },
    { source: 'Instagram', target: 'TikTok', value: 30 },
    { source: 'YouTube', target: 'Instagram', value: 18 },
  ];

  // Optimal posting times heatmap data
  const postingTimesData = [
    { day: 'Monday', hour: '9AM', engagement: 65 },
    { day: 'Monday', hour: '12PM', engagement: 78 },
    { day: 'Monday', hour: '3PM', engagement: 82 },
    { day: 'Monday', hour: '6PM', engagement: 75 },
    { day: 'Monday', hour: '9PM', engagement: 88 },
    { day: 'Tuesday', hour: '9AM', engagement: 68 },
    { day: 'Tuesday', hour: '12PM', engagement: 80 },
    { day: 'Tuesday', hour: '3PM', engagement: 85 },
    { day: 'Tuesday', hour: '6PM', engagement: 79 },
    { day: 'Tuesday', hour: '9PM', engagement: 92 },
    // ... more data for other days
  ];

  // Platform synergy metrics
  const synergyData = [
    { metric: 'Cross-Platform Views', value: 85, target: 90 },
    { metric: 'Audience Overlap', value: 42, target: 50 },
    { metric: 'Content Repurpose Rate', value: 78, target: 85 },
    { metric: 'Viral Spillover', value: 65, target: 75 },
    { metric: 'Brand Consistency', value: 88, target: 90 },
  ];

  const columns = [
    {
      title: 'Content',
      dataIndex: 'title',
      key: 'title',
      fixed: 'left',
      width: 250,
      render: (text, record) => (
        <Space>
          <img src={record.thumbnail} alt={text} style={{ width: 60, height: 45, borderRadius: 4 }} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Space size="small" style={{ marginTop: 4 }}>
              <ClockCircleOutlined style={{ fontSize: 12, color: '#888' }} />
              <span style={{ fontSize: 12, color: '#888' }}>{record.duration}</span>
              <CalendarOutlined style={{ fontSize: 12, color: '#888' }} />
              <span style={{ fontSize: 12, color: '#888' }}>{record.publishDate}</span>
            </Space>
          </div>
        </Space>
      ),
    },
    {
      title: 'YouTube',
      children: [
        {
          title: <EyeOutlined />,
          dataIndex: ['platforms', 'youtube', 'views'],
          key: 'youtube-views',
          width: 80,
          render: (val) => val ? val.toLocaleString() : '-',
        },
        {
          title: <ThunderboltOutlined />,
          dataIndex: ['platforms', 'youtube', 'engagement'],
          key: 'youtube-engagement',
          width: 80,
          render: (val) => val ? `${val}%` : '-',
        },
      ],
    },
    {
      title: 'TikTok',
      children: [
        {
          title: <EyeOutlined />,
          dataIndex: ['platforms', 'tiktok', 'views'],
          key: 'tiktok-views',
          width: 80,
          render: (val) => val ? val.toLocaleString() : '-',
        },
        {
          title: <ThunderboltOutlined />,
          dataIndex: ['platforms', 'tiktok', 'engagement'],
          key: 'tiktok-engagement',
          width: 80,
          render: (val) => val ? `${val}%` : '-',
        },
      ],
    },
    {
      title: 'Instagram',
      children: [
        {
          title: <EyeOutlined />,
          dataIndex: ['platforms', 'instagram', 'views'],
          key: 'instagram-views',
          width: 80,
          render: (val) => val ? val.toLocaleString() : '-',
        },
        {
          title: <ThunderboltOutlined />,
          dataIndex: ['platforms', 'instagram', 'engagement'],
          key: 'instagram-engagement',
          width: 80,
          render: (val) => val ? `${val}%` : '-',
        },
      ],
    },
    {
      title: 'Performance',
      children: [
        {
          title: 'Total Reach',
          dataIndex: 'totalReach',
          key: 'totalReach',
          width: 100,
          render: (val) => (
            <Statistic
              value={val}
              valueStyle={{ fontSize: 14 }}
              formatter={(value) => value.toLocaleString()}
            />
          ),
        },
        {
          title: 'Viral Score',
          dataIndex: 'viralScore',
          key: 'viralScore',
          width: 100,
          render: (score) => (
            <Progress
              type="circle"
              percent={score}
              width={40}
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
          ),
        },
      ],
    },
    {
      title: 'Best Platform',
      dataIndex: 'bestPlatform',
      key: 'bestPlatform',
      width: 100,
      render: (platform) => (
        <Tag color={platform === 'TikTok' ? 'magenta' : platform === 'YouTube' ? 'red' : platform === 'Instagram' ? 'purple' : 'blue'}>
          {platform}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          size="small"
          onClick={() => setSelectedContent(record)}
        >
          Preview
        </Button>
      ),
    },
  ];

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'youtube': return <YoutubeOutlined style={{ color: '#FF0000' }} />;
      case 'tiktok': return <img src="/api/placeholder/16/16" alt="TikTok" />;
      case 'instagram': return <InstagramOutlined style={{ color: '#E4405F' }} />;
      case 'facebook': return <FacebookOutlined style={{ color: '#1877F2' }} />;
      default: return <GlobalOutlined />;
    }
  };

  return (
    <div className="cross-platform">
      <div className="page-header">
        <h1>Cross-Platform Synergy Analysis</h1>
        <Space>
          <Select 
            mode="multiple"
            value={selectedPlatforms} 
            onChange={setSelectedPlatforms} 
            style={{ width: 200 }}
            placeholder="Select platforms"
          >
            <Option value="all">All Platforms</Option>
            <Option value="youtube">YouTube</Option>
            <Option value="tiktok">TikTok</Option>
            <Option value="instagram">Instagram</Option>
            <Option value="facebook">Facebook</Option>
          </Select>
          <RangePicker onChange={setDateRange} />
          <Button type="primary" icon={<SyncOutlined />}>Sync Data</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <MetricCard
            title="Total Cross-Platform Reach"
            value="8.2M"
            prefix={<GlobalOutlined />}
            trend={28.5}
            period="vs last month"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Platform Synergy Score"
            value="87%"
            prefix={<SyncOutlined />}
            trend={12.3}
            period="vs last month"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Viral Spillover Rate"
            value="65%"
            prefix={<RocketOutlined />}
            trend={18.7}
            period="vs last month"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Content Efficiency"
            value="3.4x"
            prefix={<FundOutlined />}
            trend={22.1}
            period="ROI improvement"
          />
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
        <TabPane tab="Platform Comparison" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Platform Performance Overview">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={platformComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="views" fill="#1890ff" name="Views (K)" />
                    <Bar yAxisId="left" dataKey="engagement" fill="#52c41a" name="Engagement %" />
                    <Bar yAxisId="right" dataKey="avgWatchTime" fill="#faad14" name="Avg Watch Time (s)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Platform Synergy Metrics">
                <div style={{ padding: '0 16px' }}>
                  {synergyData.map((item, index) => (
                    <div key={index} style={{ marginBottom: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span>{item.metric}</span>
                        <span>{item.value}%</span>
                      </div>
                      <Progress
                        percent={item.value}
                        strokeColor={{
                          '0%': '#108ee9',
                          '100%': '#87d068',
                        }}
                        trailColor="#f0f0f0"
                        showInfo={false}
                      />
                      <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                        Target: {item.target}%
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Content Performance Matrix" key="2">
          <Card>
            <Alert
              message="Cross-Platform Performance Analysis"
              description="Compare how your content performs across different platforms. Click on any content to see detailed analytics and preview."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Table
              columns={columns}
              dataSource={contentPerformanceData}
              rowKey="id"
              scroll={{ x: 1200 }}
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Content Propagation Flow" key="3">
          <Row gutter={16}>
            <Col span={16}>
              <Card 
                title="Content Viral Path Analysis" 
                extra={<Tag color="blue">AI-Powered Insights</Tag>}
              >
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <Alert
                    message="Content Flow Visualization"
                    description="This diagram shows how content spreads across platforms. Thicker lines indicate stronger viral propagation."
                    type="info"
                    style={{ marginBottom: 20 }}
                  />
                  <Space direction="vertical" size="large">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 60 }}>
                      <div style={{ textAlign: 'center' }}>
                        <YoutubeOutlined style={{ fontSize: 48, color: '#FF0000' }} />
                        <div>YouTube</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <img src="/api/placeholder/48/48" alt="TikTok" />
                        <div>TikTok</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <InstagramOutlined style={{ fontSize: 48, color: '#E4405F' }} />
                        <div>Instagram</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <FacebookOutlined style={{ fontSize: 48, color: '#1877F2' }} />
                        <div>Facebook</div>
                      </div>
                    </div>
                  </Space>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Propagation Insights">
                <Timeline>
                  <Timeline.Item color="green">
                    <strong>TikTok → Instagram</strong>
                    <p>35% of viral TikToks get reposted to Instagram Reels within 24 hours</p>
                  </Timeline.Item>
                  <Timeline.Item color="blue">
                    <strong>Instagram → TikTok</strong>
                    <p>30% cross-posting rate, especially for product demos</p>
                  </Timeline.Item>
                  <Timeline.Item color="orange">
                    <strong>YouTube → Facebook</strong>
                    <p>Long-form content gets clipped for Facebook audience</p>
                  </Timeline.Item>
                  <Timeline.Item>
                    <strong>Multi-Platform Strategy</strong>
                    <p>Content adapted for each platform sees 3.2x higher engagement</p>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Platform Best Practices" key="4">
          <Row gutter={[16, 16]}>
            {platformBestPractices.map((platform, index) => (
              <Col span={12} key={index}>
                <Card
                  title={
                    <Space>
                      {platform.icon}
                      <span>{platform.platform}</span>
                    </Space>
                  }
                  className="platform-practice-card"
                >
                  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                      <strong>Best Posting Time:</strong>
                      <Tag color="blue" style={{ marginLeft: 8 }}>{platform.bestTime}</Tag>
                    </div>
                    <div>
                      <strong>Optimal Length:</strong>
                      <Tag color="green" style={{ marginLeft: 8 }}>{platform.optimalLength}</Tag>
                    </div>
                    <div>
                      <strong>Key Metrics:</strong>
                      <div style={{ marginTop: 8 }}>
                        {platform.keyMetrics.map((metric, idx) => (
                          <Tag key={idx} style={{ marginBottom: 4 }}>{metric}</Tag>
                        ))}
                      </div>
                    </div>
                    <Divider style={{ margin: '12px 0' }} />
                    <div>
                      <strong>Top Tips:</strong>
                      <ul style={{ marginTop: 8, paddingLeft: 20 }}>
                        {platform.tips.map((tip, idx) => (
                          <li key={idx} style={{ marginBottom: 4 }}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="Optimal Posting Schedule" key="5">
          <Card 
            title="Cross-Platform Posting Heatmap"
            extra={
              <Space>
                <Tag color="green">High Engagement</Tag>
                <Tag color="orange">Medium Engagement</Tag>
                <Tag color="red">Low Engagement</Tag>
              </Space>
            }
          >
            <div style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: 800, padding: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
                  <div style={{ fontWeight: 'bold' }}>Time/Day</div>
                  {['9AM', '12PM', '3PM', '6PM', '9PM'].map(time => (
                    <div key={time} style={{ textAlign: 'center', fontWeight: 'bold' }}>{time}</div>
                  ))}
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                    <React.Fragment key={day}>
                      <div style={{ fontWeight: 'bold' }}>{day}</div>
                      {['9AM', '12PM', '3PM', '6PM', '9PM'].map(time => {
                        const engagement = Math.floor(Math.random() * 40) + 60;
                        const color = engagement > 85 ? '#52c41a' : engagement > 70 ? '#faad14' : '#f5222d';
                        return (
                          <div
                            key={`${day}-${time}`}
                            style={{
                              background: color,
                              color: 'white',
                              padding: '8px 4px',
                              borderRadius: 4,
                              textAlign: 'center',
                              fontSize: 12
                            }}
                          >
                            {engagement}%
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <Alert
              message="Recommendation"
              description="Based on your audience activity, the best times to post across all platforms are Tuesday and Thursday between 6-9 PM EST."
              type="success"
              showIcon
              style={{ marginTop: 16 }}
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

export default CrossPlatform;