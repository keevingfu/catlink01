import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Table, 
  Tag, 
  Progress, 
  Statistic, 
  Button, 
  Space, 
  Select, 
  Avatar, 
  Tabs,
  Modal,
  Tooltip,
  Badge,
  Rate,
  Segmented,
  Alert,
  Typography
} from 'antd';
import {
  UserOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
  RiseOutlined,
  FallOutlined,
  VideoCameraOutlined,
  TrophyOutlined,
  TeamOutlined,
  BarChartOutlined,
  CalendarOutlined,
  FilterOutlined
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ScatterChart,
  Scatter
} from 'recharts';
import ReactPlayer from 'react-player';
import './index.css';

const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;

const InfluencerAnalysis = () => {
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [platform, setPlatform] = useState('all');
  const [timeRange, setTimeRange] = useState('30d');
  const [influencerType, setInfluencerType] = useState('all');

  // Mock data for influencers
  const influencers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahj_lifestyle',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      platform: 'youtube',
      followers: 850000,
      engagement_rate: 8.5,
      avg_views: 125000,
      category: 'Lifestyle',
      tier: 'macro',
      score: 92,
      growth_rate: 15.2,
      videos_count: 234,
      collaborations: 45,
      status: 'verified'
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@mikechen_tech',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      platform: 'tiktok',
      followers: 1200000,
      engagement_rate: 12.3,
      avg_views: 280000,
      category: 'Technology',
      tier: 'mega',
      score: 88,
      growth_rate: 22.5,
      videos_count: 456,
      collaborations: 67,
      status: 'verified'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      username: '@emma_beauty',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      platform: 'instagram',
      followers: 450000,
      engagement_rate: 9.8,
      avg_views: 65000,
      category: 'Beauty',
      tier: 'mid',
      score: 85,
      growth_rate: 18.7,
      videos_count: 189,
      collaborations: 34,
      status: 'verified'
    },
    {
      id: 4,
      name: 'David Park',
      username: '@davidpark_fitness',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      platform: 'youtube',
      followers: 320000,
      engagement_rate: 7.2,
      avg_views: 45000,
      category: 'Fitness',
      tier: 'mid',
      score: 78,
      growth_rate: 10.3,
      videos_count: 156,
      collaborations: 23,
      status: 'rising'
    },
    {
      id: 5,
      name: 'Lisa Zhang',
      username: '@lisa_foodie',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      platform: 'tiktok',
      followers: 680000,
      engagement_rate: 11.5,
      avg_views: 150000,
      category: 'Food',
      tier: 'macro',
      score: 90,
      growth_rate: 25.8,
      videos_count: 312,
      collaborations: 56,
      status: 'verified'
    }
  ];

  // Video analysis data
  const videoAnalysisData = [
    {
      id: 'v1',
      title: 'Smart Cat Litter Box - Complete Review',
      thumbnail: 'https://picsum.photos/seed/video1/320/180',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      views: 245000,
      likes: 18500,
      comments: 1250,
      shares: 890,
      duration: '12:34',
      published: '2024-01-15',
      sentiment: 'positive',
      engagement_score: 92,
      virality_score: 85,
      categories: ['Product Review', 'Pet Care', 'Technology']
    },
    {
      id: 'v2',
      title: 'Cat Feeding Routine with Auto-Feeder',
      thumbnail: 'https://picsum.photos/seed/video2/320/180',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      views: 189000,
      likes: 14200,
      comments: 890,
      shares: 567,
      duration: '8:45',
      published: '2024-01-20',
      sentiment: 'positive',
      engagement_score: 88,
      virality_score: 78,
      categories: ['Tutorial', 'Pet Care', 'Lifestyle']
    },
    {
      id: 'v3',
      title: 'Top 5 Smart Pet Gadgets 2024',
      thumbnail: 'https://picsum.photos/seed/video3/320/180',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      views: 412000,
      likes: 32100,
      comments: 2340,
      shares: 1890,
      duration: '15:22',
      published: '2024-01-10',
      sentiment: 'very positive',
      engagement_score: 95,
      virality_score: 92,
      categories: ['List', 'Technology', 'Pet Care']
    }
  ];

  // Performance metrics over time
  const performanceData = [
    { month: 'Jan', followers: 720000, engagement: 7.2, videos: 12 },
    { month: 'Feb', followers: 750000, engagement: 7.8, videos: 14 },
    { month: 'Mar', followers: 785000, engagement: 8.1, videos: 16 },
    { month: 'Apr', followers: 820000, engagement: 8.3, videos: 15 },
    { month: 'May', followers: 850000, engagement: 8.5, videos: 18 },
    { month: 'Jun', followers: 885000, engagement: 8.7, videos: 20 }
  ];

  // Engagement breakdown
  const engagementBreakdown = [
    { name: 'Likes', value: 45, color: '#ff4d4f' },
    { name: 'Comments', value: 25, color: '#52c41a' },
    { name: 'Shares', value: 20, color: '#1890ff' },
    { name: 'Saves', value: 10, color: '#faad14' }
  ];

  // Content performance radar
  const contentRadarData = [
    { metric: 'Creativity', A: 85, B: 75, fullMark: 100 },
    { metric: 'Relevance', A: 92, B: 85, fullMark: 100 },
    { metric: 'Quality', A: 88, B: 80, fullMark: 100 },
    { metric: 'Consistency', A: 78, B: 88, fullMark: 100 },
    { metric: 'Authenticity', A: 95, B: 82, fullMark: 100 },
    { metric: 'Trend Adoption', A: 82, B: 90, fullMark: 100 }
  ];

  // Audience demographics
  const audienceDemographics = {
    age: [
      { range: '18-24', percentage: 28 },
      { range: '25-34', percentage: 42 },
      { range: '35-44', percentage: 20 },
      { range: '45+', percentage: 10 }
    ],
    gender: [
      { type: 'Female', value: 65 },
      { type: 'Male', value: 32 },
      { type: 'Other', value: 3 }
    ],
    geography: [
      { country: 'USA', percentage: 45 },
      { country: 'UK', percentage: 18 },
      { country: 'Canada', percentage: 12 },
      { country: 'Australia', percentage: 8 },
      { country: 'Others', percentage: 17 }
    ]
  };

  const columns = [
    {
      title: 'Influencer',
      key: 'influencer',
      fixed: 'left',
      width: 250,
      render: (record) => (
        <Space>
          <Avatar size={40} src={record.avatar} />
          <div>
            <div style={{ fontWeight: 600 }}>{record.name}</div>
            <Text type="secondary" style={{ fontSize: 12 }}>{record.username}</Text>
          </div>
          {record.status === 'verified' && (
            <Badge count={<TrophyOutlined style={{ color: '#52c41a' }} />} />
          )}
        </Space>
      )
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      width: 100,
      render: (platform) => {
        const config = {
          youtube: { color: 'red', icon: <VideoCameraOutlined /> },
          tiktok: { color: 'black', icon: <VideoCameraOutlined /> },
          instagram: { color: 'purple', icon: <VideoCameraOutlined /> }
        };
        return (
          <Tag color={config[platform]?.color}>
            {config[platform]?.icon} {platform.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      key: 'followers',
      width: 120,
      sorter: (a, b) => a.followers - b.followers,
      render: (value) => (
        <Statistic
          value={value}
          precision={0}
          valueStyle={{ fontSize: 14 }}
          suffix={value > 1000000 ? 'M' : 'K'}
          formatter={(val) => val > 1000000 ? (val / 1000000).toFixed(1) : (val / 1000).toFixed(0)}
        />
      )
    },
    {
      title: 'Engagement Rate',
      dataIndex: 'engagement_rate',
      key: 'engagement_rate',
      width: 150,
      sorter: (a, b) => a.engagement_rate - b.engagement_rate,
      render: (value) => (
        <Space>
          <Progress
            percent={value * 10}
            steps={10}
            size="small"
            strokeColor={value > 10 ? '#52c41a' : value > 5 ? '#faad14' : '#ff4d4f'}
            showInfo={false}
          />
          <span>{value}%</span>
        </Space>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 120,
      filters: [
        { text: 'Lifestyle', value: 'Lifestyle' },
        { text: 'Technology', value: 'Technology' },
        { text: 'Beauty', value: 'Beauty' },
        { text: 'Fitness', value: 'Fitness' },
        { text: 'Food', value: 'Food' }
      ],
      onFilter: (value, record) => record.category === value,
      render: (category) => <Tag>{category}</Tag>
    },
    {
      title: 'Growth',
      dataIndex: 'growth_rate',
      key: 'growth_rate',
      width: 100,
      sorter: (a, b) => a.growth_rate - b.growth_rate,
      render: (value) => (
        <Space>
          {value > 0 ? <RiseOutlined style={{ color: '#52c41a' }} /> : <FallOutlined style={{ color: '#ff4d4f' }} />}
          <span style={{ color: value > 0 ? '#52c41a' : '#ff4d4f' }}>
            {value > 0 ? '+' : ''}{value}%
          </span>
        </Space>
      )
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      width: 100,
      sorter: (a, b) => a.score - b.score,
      render: (score) => (
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="circle"
            percent={score}
            width={50}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      fixed: 'right',
      width: 100,
      render: (record) => (
        <Space>
          <Button
            size="small"
            icon={<BarChartOutlined />}
            onClick={() => setSelectedInfluencer(record)}
          >
            Analyze
          </Button>
        </Space>
      )
    }
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setVideoModalVisible(true);
  };

  const VideoAnalysisCard = ({ video }) => (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        <div style={{ position: 'relative', paddingTop: '56.25%', backgroundColor: '#f0f0f0' }}>
          <img
            alt={video.title}
            src={video.thumbnail}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 8,
            right: 8,
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 12
          }}>
            {video.duration}
          </div>
          <Button
            type="primary"
            shape="circle"
            icon={<PlayCircleOutlined />}
            size="large"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => handleVideoClick(video)}
          />
        </div>
      }
      actions={[
        <Space key="views">
          <EyeOutlined />
          {(video.views / 1000).toFixed(1)}K
        </Space>,
        <Space key="likes">
          <HeartOutlined />
          {(video.likes / 1000).toFixed(1)}K
        </Space>,
        <Space key="comments">
          <CommentOutlined />
          {video.comments}
        </Space>
      ]}
    >
      <Card.Meta
        title={<Tooltip title={video.title}>{video.title}</Tooltip>}
        description={
          <Space direction="vertical" style={{ width: '100%' }}>
            <Space wrap>
              {video.categories.map(cat => (
                <Tag key={cat} color="blue">{cat}</Tag>
              ))}
            </Space>
            <Row gutter={8}>
              <Col span={12}>
                <Text type="secondary">Engagement</Text>
                <Progress percent={video.engagement_score} size="small" />
              </Col>
              <Col span={12}>
                <Text type="secondary">Virality</Text>
                <Progress 
                  percent={video.virality_score} 
                  size="small"
                  strokeColor="#ff4d4f"
                />
              </Col>
            </Row>
            <Tag color={video.sentiment === 'very positive' ? 'green' : 'blue'}>
              {video.sentiment.toUpperCase()}
            </Tag>
          </Space>
        }
      />
    </Card>
  );

  return (
    <div className="influencer-analysis">
      <div className="page-header">
        <Title level={2}>Content for KOL</Title>
        <Paragraph type="secondary">
          Track and analyze influencer performance, engagement metrics, and content effectiveness
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Influencers"
              value={1284}
              prefix={<TeamOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#52c41a' }}>
                  +12.5%
                </span>
              }
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Avg. Engagement Rate"
              value={8.7}
              precision={1}
              prefix={<HeartOutlined />}
              suffix="%"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Reach"
              value={25.8}
              precision={1}
              prefix={<EyeOutlined />}
              suffix="M"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Campaigns"
              value={42}
              prefix={<VideoCameraOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#faad14' }}>
                  8 pending
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      <Space style={{ marginBottom: 16 }} wrap>
        <Select
          style={{ width: 200 }}
          placeholder="Select Platform"
          value={platform}
          onChange={setPlatform}
        >
          <Option value="all">All Platforms</Option>
          <Option value="youtube">YouTube</Option>
          <Option value="tiktok">TikTok</Option>
          <Option value="instagram">Instagram</Option>
        </Select>
        <Select
          style={{ width: 200 }}
          placeholder="Influencer Type"
          value={influencerType}
          onChange={setInfluencerType}
        >
          <Option value="all">All Types</Option>
          <Option value="mega">Mega (1M+)</Option>
          <Option value="macro">Macro (100K-1M)</Option>
          <Option value="mid">Mid-Tier (10K-100K)</Option>
          <Option value="micro">Micro (1K-10K)</Option>
        </Select>
        <Select
          style={{ width: 150 }}
          value={timeRange}
          onChange={setTimeRange}
        >
          <Option value="7d">Last 7 Days</Option>
          <Option value="30d">Last 30 Days</Option>
          <Option value="90d">Last 90 Days</Option>
          <Option value="1y">Last Year</Option>
        </Select>
      </Space>

      <Tabs defaultActiveKey="overview" size="large">
        <TabPane 
          tab={<span><TeamOutlined /> Influencer Overview</span>} 
          key="overview"
        >
          <Card>
            <Table
              columns={columns}
              dataSource={influencers}
              rowKey="id"
              scroll={{ x: 1300 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} influencers`
              }}
            />
          </Card>
        </TabPane>

        <TabPane 
          tab={<span><VideoCameraOutlined /> Video Analysis</span>} 
          key="video-analysis"
        >
          <Alert
            message="Video Performance Analysis"
            description="Analyze video content performance, engagement metrics, and viewer sentiment across different platforms"
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
          
          <Row gutter={[16, 16]}>
            {videoAnalysisData.map(video => (
              <Col xs={24} sm={12} lg={8} key={video.id}>
                <VideoAnalysisCard video={video} />
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
            <Col span={12}>
              <Card title="Video Engagement Trends">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="videos" stroke="#8884d8" name="Videos Published" />
                    <Line type="monotone" dataKey="engagement" stroke="#82ca9d" name="Engagement Rate" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Content Performance Radar">
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={contentRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Current" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Average" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane 
          tab={<span><BarChartOutlined /> Performance Analytics</span>} 
          key="analytics"
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title="Engagement Breakdown">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={engagementBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {engagementBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Audience Age Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={audienceDemographics.age}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <RechartsTooltip />
                    <Bar dataKey="percentage" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Geographic Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={audienceDemographics.geography}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ country, percentage }) => `${country} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {audienceDemographics.geography.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'][index]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Card style={{ marginTop: 16 }} title="Follower Growth Trend">
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Area type="monotone" dataKey="followers" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabPane>
      </Tabs>

      <Modal
        title={selectedVideo?.title}
        visible={videoModalVisible}
        onCancel={() => {
          setVideoModalVisible(false);
          setSelectedVideo(null);
        }}
        footer={null}
        width={800}
        destroyOnClose
      >
        {selectedVideo && (
          <div>
            <ReactPlayer
              url={selectedVideo.url}
              width="100%"
              height="450px"
              controls
              playing={false}
            />
            <div style={{ marginTop: 16 }}>
              <Row gutter={[16, 16]}>
                <Col span={6}>
                  <Statistic
                    title="Views"
                    value={selectedVideo.views}
                    prefix={<EyeOutlined />}
                    formatter={(value) => `${(value / 1000).toFixed(1)}K`}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Likes"
                    value={selectedVideo.likes}
                    prefix={<HeartOutlined />}
                    formatter={(value) => `${(value / 1000).toFixed(1)}K`}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Comments"
                    value={selectedVideo.comments}
                    prefix={<CommentOutlined />}
                  />
                </Col>
                <Col span={6}>
                  <Statistic
                    title="Shares"
                    value={selectedVideo.shares}
                    prefix={<ShareAltOutlined />}
                  />
                </Col>
              </Row>
              <div style={{ marginTop: 16 }}>
                <Text strong>Categories: </Text>
                {selectedVideo.categories.map(cat => (
                  <Tag key={cat} color="blue" style={{ marginRight: 8 }}>{cat}</Tag>
                ))}
              </div>
              <div style={{ marginTop: 8 }}>
                <Text strong>Published: </Text>
                <Text>{selectedVideo.published}</Text>
              </div>
              <div style={{ marginTop: 8 }}>
                <Space>
                  <Text strong>Engagement Score:</Text>
                  <Progress percent={selectedVideo.engagement_score} style={{ width: 100 }} />
                  <Text strong>Virality Score:</Text>
                  <Progress percent={selectedVideo.virality_score} strokeColor="#ff4d4f" style={{ width: 100 }} />
                </Space>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InfluencerAnalysis;