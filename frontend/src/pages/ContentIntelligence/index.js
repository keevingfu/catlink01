import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Select, DatePicker, Space, Tag, Table, Progress, Statistic, Button, Tooltip, Rate, Badge } from 'antd';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Treemap } from 'recharts';
import { 
  PlayCircleOutlined, 
  EyeOutlined, 
  SoundOutlined, 
  SmileOutlined,
  ThunderboltOutlined,
  ClockCircleOutlined,
  FireOutlined,
  RiseOutlined,
  TagsOutlined,
  PictureOutlined,
  AudioOutlined,
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
  ExperimentOutlined,
  BulbOutlined,
  FileTextOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';
import VideoPreview from '../../components/VideoPreview';
import MetricCard from '../../components/MetricCard';
import './index.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const ContentIntelligence = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [analysisMode, setAnalysisMode] = useState('multi-modal');

  // Multi-modal analysis data
  const multiModalData = [
    { subject: 'Visual Appeal', score: 85, benchmark: 70 },
    { subject: 'Audio Quality', score: 78, benchmark: 65 },
    { subject: 'Emotional Impact', score: 92, benchmark: 75 },
    { subject: 'Information Density', score: 73, benchmark: 60 },
    { subject: 'Narrative Flow', score: 88, benchmark: 72 },
    { subject: 'Brand Alignment', score: 81, benchmark: 68 }
  ];

  // Content clustering data
  const clusterData = [
    { name: 'Educational', value: 3500, fill: '#1890ff' },
    { name: 'Entertainment', value: 2800, fill: '#52c41a' },
    { name: 'Product Demo', value: 2200, fill: '#faad14' },
    { name: 'User Generated', value: 1900, fill: '#f5222d' },
    { name: 'Behind Scenes', value: 1500, fill: '#722ed1' },
    { name: 'Tutorials', value: 1200, fill: '#13c2c2' }
  ];

  // Video segment analysis
  const segmentData = [
    { time: '0:00', engagement: 100, attention: 95, emotion: 'neutral' },
    { time: '0:15', engagement: 85, attention: 88, emotion: 'curious' },
    { time: '0:30', engagement: 92, attention: 94, emotion: 'excited' },
    { time: '0:45', engagement: 88, attention: 85, emotion: 'happy' },
    { time: '1:00', engagement: 95, attention: 98, emotion: 'surprised' },
    { time: '1:15', engagement: 82, attention: 80, emotion: 'neutral' },
    { time: '1:30', engagement: 78, attention: 75, emotion: 'satisfied' },
  ];

  // AI insights data
  const aiInsights = [
    {
      id: 1,
      type: 'opportunity',
      priority: 'high',
      insight: 'Pet reaction moments at 0:45 and 1:23 show highest engagement spikes',
      recommendation: 'Create more content featuring pet interactions with the product',
      impact: '+35% engagement'
    },
    {
      id: 2,
      type: 'improvement',
      priority: 'medium',
      insight: 'Audio clarity drops during product demonstration segments',
      recommendation: 'Use lavalier microphone for clearer voice recording',
      impact: '+15% retention'
    },
    {
      id: 3,
      type: 'trend',
      priority: 'high',
      insight: 'Quick-cut editing style matches current platform trends',
      recommendation: 'Maintain 3-5 second shot duration for optimal attention',
      impact: '+28% completion rate'
    }
  ];

  // Content performance data
  const contentLibrary = [
    {
      id: 1,
      title: 'Smart Litter Box - Complete Setup Guide',
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://example.com/video1.mp4',
      platform: 'YouTube',
      duration: '3:45',
      views: 125000,
      engagement: 8.5,
      viralScore: 85,
      emotionalTone: 'Informative',
      visualScore: 88,
      audioScore: 82,
      segments: 12,
      keyMoments: ['0:45', '1:23', '2:15'],
      hashtags: ['smartpet', 'cattech', 'petcare'],
      description: 'Comprehensive guide on setting up and using the smart litter box with app integration.'
    },
    {
      id: 2,
      title: 'Cat Reaction Compilation - First Time Using',
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://example.com/video2.mp4',
      platform: 'TikTok',
      duration: '0:58',
      views: 450000,
      engagement: 15.2,
      viralScore: 92,
      emotionalTone: 'Entertaining',
      visualScore: 91,
      audioScore: 79,
      segments: 6,
      keyMoments: ['0:12', '0:35', '0:48'],
      hashtags: ['catsoftiktok', 'funnycat', 'pettech'],
      description: 'Hilarious compilation of cats discovering the smart litter box for the first time.'
    },
    {
      id: 3,
      title: 'Health Monitoring Features Explained',
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://example.com/video3.mp4',
      platform: 'Instagram',
      duration: '1:30',
      views: 78000,
      engagement: 11.8,
      viralScore: 76,
      emotionalTone: 'Educational',
      visualScore: 84,
      audioScore: 86,
      segments: 8,
      keyMoments: ['0:20', '0:55', '1:15'],
      hashtags: ['pethealth', 'smarttech', 'catcare'],
      description: 'Deep dive into the health monitoring capabilities and app features.'
    }
  ];

  // Emotional tone distribution
  const emotionalToneData = [
    { tone: 'Joyful', value: 28, color: '#52c41a' },
    { tone: 'Informative', value: 32, color: '#1890ff' },
    { tone: 'Exciting', value: 18, color: '#faad14' },
    { tone: 'Calming', value: 12, color: '#13c2c2' },
    { tone: 'Inspiring', value: 10, color: '#722ed1' }
  ];

  // Content optimization opportunities
  const optimizationData = [
    { aspect: 'Thumbnail CTR', current: 3.2, potential: 5.8, improvement: '+81%' },
    { aspect: 'Hook Effectiveness', current: 65, potential: 88, improvement: '+35%' },
    { aspect: 'CTA Conversion', current: 2.1, potential: 3.4, improvement: '+62%' },
    { aspect: 'Watch Time', current: 45, potential: 68, improvement: '+51%' },
    { aspect: 'Share Rate', current: 1.8, potential: 2.9, improvement: '+61%' }
  ];

  const columns = [
    {
      title: 'Content',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <img src={record.thumbnail} alt={text} style={{ width: 80, height: 60, borderRadius: 4 }} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Space size="small" style={{ marginTop: 4 }}>
              <Tag color="blue">{record.platform}</Tag>
              <span style={{ color: '#888', fontSize: 12 }}>{record.duration}</span>
            </Space>
          </div>
        </Space>
      ),
    },
    {
      title: 'Multi-Modal Scores',
      key: 'scores',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Tooltip title="Visual Score">
            <Space size="small">
              <PictureOutlined />
              <Progress percent={record.visualScore} size="small" strokeWidth={4} showInfo={false} style={{ width: 60 }} />
              <span style={{ fontSize: 12 }}>{record.visualScore}%</span>
            </Space>
          </Tooltip>
          <Tooltip title="Audio Score">
            <Space size="small">
              <AudioOutlined />
              <Progress percent={record.audioScore} size="small" strokeWidth={4} showInfo={false} style={{ width: 60 }} />
              <span style={{ fontSize: 12 }}>{record.audioScore}%</span>
            </Space>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Space>
            <EyeOutlined />
            <span>{record.views.toLocaleString()}</span>
          </Space>
          <Space>
            <ThunderboltOutlined />
            <span>{record.engagement}% engagement</span>
          </Space>
        </Space>
      ),
    },
    {
      title: 'Viral Score',
      dataIndex: 'viralScore',
      key: 'viralScore',
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
      ),
      sorter: (a, b) => a.viralScore - b.viralScore,
    },
    {
      title: 'Emotional Tone',
      dataIndex: 'emotionalTone',
      key: 'emotionalTone',
      render: (tone) => (
        <Tag color={tone === 'Entertaining' ? 'gold' : tone === 'Informative' ? 'blue' : 'green'}>
          <SmileOutlined /> {tone}
        </Tag>
      ),
    },
    {
      title: 'Key Insights',
      key: 'insights',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Tooltip title="Key Moments">
            <Badge count={record.keyMoments.length} style={{ backgroundColor: '#52c41a' }}>
              <ClockCircleOutlined style={{ fontSize: 16 }} />
            </Badge>
          </Tooltip>
          <Tooltip title="Segments Analyzed">
            <Badge count={record.segments} style={{ backgroundColor: '#1890ff' }}>
              <FileTextOutlined style={{ fontSize: 16 }} />
            </Badge>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            icon={<PlayCircleOutlined />}
            onClick={() => setSelectedVideo(record)}
          >
            Analyze
          </Button>
        </Space>
      ),
    },
  ];

  const getInsightIcon = (type) => {
    switch (type) {
      case 'opportunity': return <BulbOutlined style={{ color: '#52c41a' }} />;
      case 'improvement': return <ExperimentOutlined style={{ color: '#faad14' }} />;
      case 'trend': return <RiseOutlined style={{ color: '#1890ff' }} />;
      default: return <BulbOutlined />;
    }
  };

  return (
    <div className="content-intelligence">
      <div className="page-header">
        <h1>Content Testing</h1>
        <Space>
          <Select value={analysisMode} onChange={setAnalysisMode} style={{ width: 150 }}>
            <Option value="multi-modal">Multi-Modal Analysis</Option>
            <Option value="emotional">Emotional Analysis</Option>
            <Option value="technical">Technical Analysis</Option>
          </Select>
          <Select value={selectedPlatform} onChange={setSelectedPlatform} style={{ width: 120 }}>
            <Option value="all">All Platforms</Option>
            <Option value="youtube">YouTube</Option>
            <Option value="tiktok">TikTok</Option>
            <Option value="instagram">Instagram</Option>
          </Select>
          <RangePicker onChange={setDateRange} />
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={6}>
          <MetricCard
            title="Content Analyzed"
            value="2,847"
            prefix={<VideoCameraOutlined />}
            trend={23.5}
            period="vs last month"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Avg. Viral Score"
            value="82.3"
            prefix={<FireOutlined />}
            trend={15.2}
            suffix="/100"
            period="vs last month"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="Emotional Resonance"
            value="88%"
            prefix={<HeartOutlined />}
            trend={8.7}
            period="vs last month"
          />
        </Col>
        <Col span={6}>
          <MetricCard
            title="AI Insights Generated"
            value="156"
            prefix={<BulbOutlined />}
            trend={42.1}
            period="this week"
          />
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
        <TabPane tab="Multi-Modal Analysis" key="1">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Content Intelligence Radar" extra={<Tag color="blue">Real-time Analysis</Tag>}>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={multiModalData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Your Content" dataKey="score" stroke="#1890ff" fill="#1890ff" fillOpacity={0.6} />
                    <Radar name="Industry Benchmark" dataKey="benchmark" stroke="#f5222d" fill="#f5222d" fillOpacity={0.3} />
                    <RechartsTooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Content Clustering Analysis">
                <ResponsiveContainer width="100%" height={400}>
                  <Treemap
                    data={clusterData}
                    dataKey="value"
                    aspectRatio={4/3}
                    stroke="#fff"
                    content={({ x, y, width, height, name, value, fill }) => (
                      <g>
                        <rect x={x} y={y} width={width} height={height} fill={fill} />
                        <text x={x + width / 2} y={y + height / 2 - 10} textAnchor="middle" fill="#fff" fontSize={14} fontWeight="bold">
                          {name}
                        </text>
                        <text x={x + width / 2} y={y + height / 2 + 10} textAnchor="middle" fill="#fff" fontSize={12}>
                          {value} videos
                        </text>
                      </g>
                    )}
                  />
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Video Segment Analysis" key="2">
          <Card 
            title="Engagement Timeline Analysis" 
            extra={
              <Space>
                <Tag color="green">Peak Moments Identified</Tag>
                <Tag color="blue">AI-Powered</Tag>
              </Space>
            }
          >
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={segmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Line type="monotone" dataKey="engagement" stroke="#1890ff" strokeWidth={2} name="Engagement Score" />
                <Line type="monotone" dataKey="attention" stroke="#52c41a" strokeWidth={2} name="Attention Level" />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 16 }}>
              <Space wrap>
                {segmentData.map((segment, index) => (
                  <Tag key={index} color={segment.engagement > 90 ? 'green' : 'default'}>
                    {segment.time} - {segment.emotion}
                  </Tag>
                ))}
              </Space>
            </div>
          </Card>
        </TabPane>

        <TabPane tab="AI Insights & Recommendations" key="3">
          <Row gutter={[16, 16]}>
            {aiInsights.map(insight => (
              <Col span={8} key={insight.id}>
                <Card
                  title={
                    <Space>
                      {getInsightIcon(insight.type)}
                      <span>AI Insight</span>
                    </Space>
                  }
                  extra={<Tag color={insight.priority === 'high' ? 'red' : 'orange'}>{insight.priority} priority</Tag>}
                >
                  <p style={{ marginBottom: 16 }}>{insight.insight}</p>
                  <div style={{ padding: 12, background: '#f0f2f5', borderRadius: 8 }}>
                    <strong>Recommendation:</strong>
                    <p style={{ margin: '8px 0 0 0' }}>{insight.recommendation}</p>
                  </div>
                  <div style={{ marginTop: 16, textAlign: 'center' }}>
                    <Statistic
                      value={insight.impact}
                      valueStyle={{ color: '#52c41a', fontSize: 20 }}
                      prefix={<RiseOutlined />}
                    />
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="Emotional Tone Analysis" key="4">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Emotional Distribution">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={emotionalToneData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {emotionalToneData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Optimization Opportunities">
                <div style={{ padding: '0 16px' }}>
                  {optimizationData.map((item, index) => (
                    <div key={index} style={{ marginBottom: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span>{item.aspect}</span>
                        <Tag color="green">{item.improvement}</Tag>
                      </div>
                      <Progress
                        percent={item.potential}
                        success={{ percent: item.current }}
                        format={() => `${item.current}% → ${item.potential}%`}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Content Library" key="5">
          <Card>
            <Table
              columns={columns}
              dataSource={contentLibrary}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>
      </Tabs>

      {selectedVideo && (
        <VideoPreview
          visible={!!selectedVideo}
          content={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default ContentIntelligence;