import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Select, DatePicker, Space, Tag, Table, Progress, Statistic, Button, Alert, Timeline, Divider, Badge, List, Avatar } from 'antd';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { 
  DollarOutlined,
  RiseOutlined,
  FundOutlined,
  TrophyOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  BulbOutlined,
  AlertOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  GlobalOutlined,
  DashboardOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  PlayCircleOutlined,
  EyeOutlined,
  HeartOutlined,
  CommentOutlined,
  ShareAltOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  UserOutlined,
  ShoppingOutlined,
  PercentageOutlined,
  FlagOutlined,
  ThunderboltOutlined,
  SyncOutlined,
  RocketOutlined
} from '@ant-design/icons';
import VideoPreview from '../../components/VideoPreview';
import MetricCard from '../../components/MetricCard';
import './index.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const BusinessInsights = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [dateRange, setDateRange] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Executive KPI Summary
  const executiveSummary = {
    revenue: { value: '$2.85M', trend: 28.5, target: '$3M', completion: 95 },
    customers: { value: '45.2K', trend: 15.3, target: '50K', completion: 90.4 },
    retention: { value: '82%', trend: 5.2, target: '85%', completion: 96.5 },
    ltv: { value: '$285', trend: 12.8, target: '$300', completion: 95 }
  };

  // Revenue breakdown data
  const revenueBreakdown = [
    { source: 'Product Sales', value: 1850000, percentage: 65, color: '#1890ff' },
    { source: 'Subscriptions', value: 570000, percentage: 20, color: '#52c41a' },
    { source: 'Advertising', value: 285000, percentage: 10, color: '#faad14' },
    { source: 'Partnerships', value: 145000, percentage: 5, color: '#722ed1' }
  ];

  // Business performance trends
  const performanceTrends = [
    { month: 'Jan', revenue: 185000, profit: 45000, customers: 3200, satisfaction: 88 },
    { month: 'Feb', revenue: 195000, profit: 52000, customers: 3500, satisfaction: 87 },
    { month: 'Mar', revenue: 220000, profit: 68000, customers: 3800, satisfaction: 89 },
    { month: 'Apr', revenue: 245000, profit: 78000, customers: 4200, satisfaction: 91 },
    { month: 'May', revenue: 265000, profit: 85000, customers: 4500, satisfaction: 92 },
    { month: 'Jun', revenue: 285000, profit: 95000, customers: 4800, satisfaction: 93 }
  ];

  // Content ROI analysis
  const contentROIData = [
    {
      id: 1,
      title: 'Product Launch Campaign',
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://example.com/video1.mp4',
      investment: 15000,
      revenue: 125000,
      roi: 733,
      conversions: 2850,
      reach: 450000,
      engagement: 12.5,
      platform: 'Multi-Platform',
      duration: '2:15',
      publishDate: '2024-01-10',
      description: 'Smart litter box launch campaign featuring product benefits and user testimonials'
    },
    {
      id: 2,
      title: 'Customer Success Stories',
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://example.com/video2.mp4',
      investment: 8000,
      revenue: 68000,
      roi: 750,
      conversions: 1560,
      reach: 280000,
      engagement: 15.8,
      platform: 'YouTube',
      duration: '3:45',
      publishDate: '2024-01-15',
      description: 'Real customers sharing their experiences with the smart litter box'
    },
    {
      id: 3,
      title: 'Educational Content Series',
      thumbnail: '/api/placeholder/120/90',
      videoUrl: 'https://example.com/video3.mp4',
      investment: 5000,
      revenue: 35000,
      roi: 600,
      conversions: 890,
      reach: 156000,
      engagement: 9.2,
      platform: 'Instagram',
      duration: '1:30',
      publishDate: '2024-01-20',
      description: 'How-to guides and tips for maximizing product benefits'
    }
  ];

  // Competitive analysis
  const competitiveAnalysis = [
    { company: 'CatLink', marketShare: 32, growth: 28, satisfaction: 92 },
    { company: 'Competitor A', marketShare: 28, growth: 15, satisfaction: 85 },
    { company: 'Competitor B', marketShare: 22, growth: 10, satisfaction: 82 },
    { company: 'Competitor C', marketShare: 18, growth: 5, satisfaction: 78 }
  ];

  // Customer segment performance
  const customerSegments = [
    { segment: 'Premium Users', value: 45, revenue: 1282500, avgOrder: 385 },
    { segment: 'Regular Buyers', value: 35, revenue: 997500, avgOrder: 185 },
    { segment: 'New Customers', value: 20, revenue: 570000, avgOrder: 125 }
  ];

  // Strategic opportunities
  const strategicOpportunities = [
    {
      id: 1,
      priority: 'high',
      title: 'Expand TikTok Presence',
      impact: 'High viral potential with 3.2x engagement rate',
      revenue: '+$450K',
      timeline: 'Q2 2024',
      status: 'planning'
    },
    {
      id: 2,
      priority: 'high',
      title: 'Launch Subscription Service',
      impact: 'Recurring revenue stream with 85% retention',
      revenue: '+$320K',
      timeline: 'Q2 2024',
      status: 'in-progress'
    },
    {
      id: 3,
      priority: 'medium',
      title: 'Partner with Pet Influencers',
      impact: 'Access to 2M+ targeted audience',
      revenue: '+$180K',
      timeline: 'Q3 2024',
      status: 'approved'
    },
    {
      id: 4,
      priority: 'medium',
      title: 'International Market Entry',
      impact: 'Tap into $5B global market',
      revenue: '+$850K',
      timeline: 'Q4 2024',
      status: 'research'
    }
  ];

  // Regional performance
  const regionalPerformance = [
    { region: 'North America', revenue: 1425000, growth: 32, customers: 22600 },
    { region: 'Europe', revenue: 855000, growth: 28, customers: 13500 },
    { region: 'Asia Pacific', revenue: 427500, growth: 45, customers: 6800 },
    { region: 'Others', revenue: 142500, growth: 18, customers: 2300 }
  ];

  const columns = [
    {
      title: 'Campaign',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Space>
          <img src={record.thumbnail} alt={text} style={{ width: 60, height: 45, borderRadius: 4 }} />
          <div>
            <div style={{ fontWeight: 500 }}>{text}</div>
            <Space size="small" style={{ marginTop: 4 }}>
              <Tag>{record.platform}</Tag>
              <span style={{ fontSize: 12, color: '#888' }}>{record.duration}</span>
            </Space>
          </div>
        </Space>
      ),
    },
    {
      title: 'Investment',
      dataIndex: 'investment',
      key: 'investment',
      render: (val) => `$${val.toLocaleString()}`,
      sorter: (a, b) => a.investment - b.investment,
    },
    {
      title: 'Revenue Generated',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (val) => (
        <Statistic
          value={val}
          prefix="$"
          valueStyle={{ fontSize: 14, color: '#52c41a' }}
          formatter={(value) => value.toLocaleString()}
        />
      ),
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      key: 'roi',
      render: (val) => (
        <div style={{ textAlign: 'center' }}>
          <Progress
            type="circle"
            percent={Math.min(val / 10, 100)}
            format={() => `${val}%`}
            width={50}
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
          />
        </div>
      ),
      sorter: (a, b) => a.roi - b.roi,
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Space>
            <ShoppingCartOutlined />
            <span>{record.conversions.toLocaleString()} conversions</span>
          </Space>
          <Space>
            <EyeOutlined />
            <span>{(record.reach / 1000).toFixed(0)}K reach</span>
          </Space>
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
            size="small"
            onClick={() => setSelectedVideo(record)}
          >
            Analyze
          </Button>
          <Button
            icon={<BarChartOutlined />}
            size="small"
          >
            Report
          </Button>
        </Space>
      ),
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'in-progress': return <SyncOutlined spin style={{ color: '#1890ff' }} />;
      case 'planning': return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      case 'approved': return <CheckCircleOutlined style={{ color: '#13c2c2' }} />;
      default: return <AlertOutlined style={{ color: '#888' }} />;
    }
  };

  return (
    <div className="business-insights">
      <div className="page-header">
        <h1>Business Intelligence Dashboard</h1>
        <Space>
          <Select value={selectedRegion} onChange={setSelectedRegion} style={{ width: 150 }}>
            <Option value="all">All Regions</Option>
            <Option value="north-america">North America</Option>
            <Option value="europe">Europe</Option>
            <Option value="asia-pacific">Asia Pacific</Option>
          </Select>
          <RangePicker onChange={setDateRange} />
          <Button type="primary" icon={<DashboardOutlined />}>Export Report</Button>
        </Space>
      </div>

      {/* Executive Summary Cards */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card className="executive-card">
            <Statistic
              title="Revenue YTD"
              value={executiveSummary.revenue.value}
              prefix={<DollarOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#52c41a' }}>
                  <ArrowUpOutlined /> {executiveSummary.revenue.trend}%
                </span>
              }
            />
            <Progress
              percent={executiveSummary.revenue.completion}
              size="small"
              format={() => `${executiveSummary.revenue.completion}% of ${executiveSummary.revenue.target}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="executive-card">
            <Statistic
              title="Active Customers"
              value={executiveSummary.customers.value}
              prefix={<TeamOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#52c41a' }}>
                  <ArrowUpOutlined /> {executiveSummary.customers.trend}%
                </span>
              }
            />
            <Progress
              percent={executiveSummary.customers.completion}
              size="small"
              format={() => `${executiveSummary.customers.completion}% of ${executiveSummary.customers.target}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="executive-card">
            <Statistic
              title="Customer Retention"
              value={executiveSummary.retention.value}
              prefix={<HeartOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#52c41a' }}>
                  <ArrowUpOutlined /> {executiveSummary.retention.trend}%
                </span>
              }
            />
            <Progress
              percent={executiveSummary.retention.completion}
              size="small"
              format={() => `${executiveSummary.retention.completion}% of ${executiveSummary.retention.target}`}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card className="executive-card">
            <Statistic
              title="Customer LTV"
              value={executiveSummary.ltv.value}
              prefix={<TrophyOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#52c41a' }}>
                  <ArrowUpOutlined /> {executiveSummary.ltv.trend}%
                </span>
              }
            />
            <Progress
              percent={executiveSummary.ltv.completion}
              size="small"
              format={() => `${executiveSummary.ltv.completion}% of ${executiveSummary.ltv.target}`}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
        <TabPane tab="Revenue Analytics" key="1">
          <Row gutter={16}>
            <Col span={16}>
              <Card title="Revenue & Profit Trends" extra={<Tag color="green">+28.5% YoY</Tag>}>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill="#1890ff" name="Revenue ($)" />
                    <Line yAxisId="left" type="monotone" dataKey="profit" stroke="#52c41a" strokeWidth={3} name="Profit ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#faad14" strokeWidth={2} name="Satisfaction (%)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Revenue Breakdown">
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={revenueBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${percentage}%`}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <List
                  size="small"
                  dataSource={revenueBreakdown}
                  renderItem={item => (
                    <List.Item>
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                          <span>{item.source}</span>
                          <strong>${(item.value / 1000000).toFixed(2)}M</strong>
                        </div>
                        <Progress percent={item.percentage} showInfo={false} strokeColor={item.color} />
                      </div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Content ROI Analysis" key="2">
          <Card>
            <Alert
              message="Content Marketing ROI Dashboard"
              description="Track the return on investment for your content campaigns. Click on any campaign to view detailed performance metrics and video preview."
              type="info"
              showIcon
              style={{ marginBottom: 16 }}
            />
            <Table
              columns={columns}
              dataSource={contentROIData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab="Market Intelligence" key="3">
          <Row gutter={16}>
            <Col span={12}>
              <Card title="Competitive Analysis" extra={<Tag color="blue">Market Leader</Tag>}>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={competitiveAnalysis}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="company" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Market Share %" dataKey="marketShare" stroke="#1890ff" fill="#1890ff" fillOpacity={0.6} />
                    <Radar name="Growth %" dataKey="growth" stroke="#52c41a" fill="#52c41a" fillOpacity={0.4} />
                    <Radar name="Satisfaction %" dataKey="satisfaction" stroke="#faad14" fill="#faad14" fillOpacity={0.3} />
                    <RechartsTooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Customer Segments">
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={customerSegments}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                      label={({ segment, value }) => `${segment}: ${value}%`}
                    >
                      {customerSegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#1890ff', '#52c41a', '#faad14'][index]} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Divider />
                <Space direction="vertical" style={{ width: '100%' }}>
                  {customerSegments.map((segment, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{segment.segment}</span>
                      <Space>
                        <Tag color="blue">${(segment.revenue / 1000).toFixed(0)}K revenue</Tag>
                        <Tag color="green">${segment.avgOrder} avg order</Tag>
                      </Space>
                    </div>
                  ))}
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Strategic Opportunities" key="4">
          <Row gutter={16}>
            <Col span={16}>
              <Card title="Growth Opportunities Pipeline">
                <List
                  itemLayout="horizontal"
                  dataSource={strategicOpportunities}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Tag color={getPriorityColor(item.priority)}>{item.priority} priority</Tag>,
                        <Space>
                          {getStatusIcon(item.status)}
                          <span>{item.status}</span>
                        </Space>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<BulbOutlined />} style={{ backgroundColor: '#1890ff' }} />}
                        title={
                          <Space>
                            <span>{item.title}</span>
                            <Tag color="green">{item.revenue}</Tag>
                          </Space>
                        }
                        description={
                          <Space direction="vertical" size="small">
                            <span>{item.impact}</span>
                            <Space>
                              <CalendarOutlined />
                              <span style={{ fontSize: 12 }}>Timeline: {item.timeline}</span>
                            </Space>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Quick Wins" extra={<Badge count="3" />}>
                <Timeline>
                  <Timeline.Item color="green" dot={<CheckCircleOutlined />}>
                    <strong>Optimize TikTok content</strong>
                    <p>3.2x higher engagement potential</p>
                  </Timeline.Item>
                  <Timeline.Item color="blue" dot={<RocketOutlined />}>
                    <strong>Launch referral program</strong>
                    <p>25% customer acquisition boost</p>
                  </Timeline.Item>
                  <Timeline.Item color="orange" dot={<AlertOutlined />}>
                    <strong>Improve mobile experience</strong>
                    <p>45% of traffic is mobile</p>
                  </Timeline.Item>
                </Timeline>
              </Card>
              <Card title="Risk Alerts" style={{ marginTop: 16 }} extra={<WarningOutlined style={{ color: '#faad14' }} />}>
                <Alert
                  message="Supply Chain Delays"
                  description="Potential 2-week delay in Q2 shipments"
                  type="warning"
                  showIcon
                  style={{ marginBottom: 12 }}
                />
                <Alert
                  message="Competitor Price Cut"
                  description="Monitor impact on market share"
                  type="info"
                  showIcon
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Regional Performance" key="5">
          <Card title="Global Market Overview">
            <Row gutter={16}>
              <Col span={16}>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={regionalPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="revenue" fill="#1890ff" name="Revenue ($)" />
                    <Line yAxisId="right" type="monotone" dataKey="growth" stroke="#52c41a" strokeWidth={3} name="Growth (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </Col>
              <Col span={8}>
                <Card title="Regional Insights" bordered={false}>
                  {regionalPerformance.map((region, index) => (
                    <div key={index} style={{ marginBottom: 20 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <strong>{region.region}</strong>
                        <Tag color="green">+{region.growth}%</Tag>
                      </div>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Revenue:</span>
                          <strong>${(region.revenue / 1000000).toFixed(2)}M</strong>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>Customers:</span>
                          <strong>{region.customers.toLocaleString()}</strong>
                        </div>
                      </Space>
                      <Divider style={{ margin: '12px 0' }} />
                    </div>
                  ))}
                </Card>
              </Col>
            </Row>
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

export default BusinessInsights;