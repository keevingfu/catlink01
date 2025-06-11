import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tag, Space, Select, DatePicker, Alert, Button, Tabs, Rate, Divider } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DollarOutlined, UserOutlined, VideoCameraOutlined, RiseOutlined, ShoppingCartOutlined, StarOutlined, ThunderboltOutlined, HomeOutlined, PlayCircleOutlined, SafetyCertificateOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Treemap, Sankey, ScatterChart, Scatter, ZAxis } from 'recharts';
import VideoPreview from '../../components/VideoPreview';
import './index.css';

const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

const Dashboard = () => {
  const [dateRange, setDateRange] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedProduct, setSelectedProduct] = useState('litter-box');
  const [selectedVideo, setSelectedVideo] = useState(null);

  // KPI data
  const kpiData = {
    revenue: { value: 125430, trend: 15.3, prefix: '$' },
    engagement: { value: 8.7, trend: 5.2, suffix: '%' },
    reach: { value: 2500000, trend: 12.8, format: 'short' },
    conversions: { value: 3847, trend: -2.1 },
  };

  // Platform performance data
  const platformData = [
    { platform: 'YouTube', views: 850000, engagement: 7.2, revenue: 45000 },
    { platform: 'TikTok', views: 1200000, engagement: 12.5, revenue: 38000 },
    { platform: 'Instagram', views: 620000, engagement: 9.8, revenue: 28000 },
    { platform: 'Facebook', views: 430000, engagement: 5.4, revenue: 14430 },
  ];

  // Time series data
  const timeSeriesData = [
    { date: 'Jan 1', revenue: 95000, views: 1800000, conversions: 2800 },
    { date: 'Jan 2', revenue: 102000, views: 2100000, conversions: 3100 },
    { date: 'Jan 3', revenue: 98000, views: 1950000, conversions: 2950 },
    { date: 'Jan 4', revenue: 115000, views: 2400000, conversions: 3500 },
    { date: 'Jan 5', revenue: 125430, views: 2500000, conversions: 3847 },
  ];

  // Content performance radar
  const radarData = [
    { metric: 'Views', A: 85, B: 65, fullMark: 100 },
    { metric: 'Engagement', A: 78, B: 82, fullMark: 100 },
    { metric: 'Shares', A: 72, B: 68, fullMark: 100 },
    { metric: 'Conversions', A: 88, B: 75, fullMark: 100 },
    { metric: 'ROI', A: 92, B: 70, fullMark: 100 },
  ];

  // Top performing content
  const topContent = [
    { id: 1, title: 'Smart Litter Box Setup Guide', platform: 'YouTube', views: 125000, roi: 3.2, status: 'trending' },
    { id: 2, title: 'Cat Health Monitoring Demo', platform: 'TikTok', views: 98000, roi: 2.8, status: 'stable' },
    { id: 3, title: 'Product Comparison Review', platform: 'Instagram', views: 87000, roi: 2.5, status: 'growing' },
    { id: 4, title: 'User Success Stories', platform: 'Facebook', views: 65000, roi: 2.1, status: 'stable' },
  ];

  // Product comparison data - Litter Box
  const litterBoxComparison = [
    { brand: 'Catlink Pro-X', price: 469, features: 85, warranty: 1, customerService: 60, odorControl: 75, appQuality: 70, noise: 65 },
    { brand: 'Litter-Robot 4', price: 699, features: 95, warranty: 3, customerService: 90, odorControl: 85, appQuality: 90, noise: 80 },
    { brand: "Leo's Loo Too", price: 700, features: 88, warranty: 1.5, customerService: 85, odorControl: 95, appQuality: 85, noise: 95 },
    { brand: 'PetSnowy SNOW+', price: 680, features: 82, warranty: 1, customerService: 75, odorControl: 90, appQuality: 80, noise: 85 },
  ];

  // Market share data
  const marketShareData = [
    { name: 'Litter-Robot', value: 35, color: '#1890ff' },
    { name: 'Catlink', value: 15, color: '#52c41a' },
    { name: "Leo's Loo", value: 20, color: '#faad14' },
    { name: 'PetSnowy', value: 18, color: '#eb2f96' },
    { name: 'Others', value: 12, color: '#722ed1' },
  ];

  // Feature comparison radar
  const featureComparisonRadar = [
    { feature: 'Price Value', catlink: 95, litterRobot: 60, leosLoo: 55, petSnowy: 58 },
    { feature: 'Smart Features', catlink: 85, litterRobot: 95, leosLoo: 88, petSnowy: 82 },
    { feature: 'Build Quality', catlink: 70, litterRobot: 95, leosLoo: 90, petSnowy: 85 },
    { feature: 'Odor Control', catlink: 75, litterRobot: 85, leosLoo: 95, petSnowy: 90 },
    { feature: 'Quiet Operation', catlink: 65, litterRobot: 80, leosLoo: 95, petSnowy: 85 },
    { feature: 'Customer Support', catlink: 60, litterRobot: 90, leosLoo: 85, petSnowy: 75 },
  ];

  // Customer satisfaction timeline
  const satisfactionTimeline = [
    { month: 'Month 1', catlink: 90, litterRobot: 92, leosLoo: 91, petSnowy: 88 },
    { month: 'Month 3', catlink: 85, litterRobot: 91, leosLoo: 90, petSnowy: 86 },
    { month: 'Month 6', catlink: 75, litterRobot: 90, leosLoo: 89, petSnowy: 84 },
    { month: 'Month 12', catlink: 65, litterRobot: 88, leosLoo: 87, petSnowy: 80 },
  ];

  // Content performance by product
  const productContentPerformance = [
    { 
      id: 1, 
      title: 'Catlink vs Litter-Robot Comparison', 
      videoUrl: 'https://example.com/comparison-video.mp4',
      thumbnail: 'https://via.placeholder.com/300x200',
      views: 285000,
      engagement: 12.5,
      conversionRate: 4.2,
      platform: 'YouTube'
    },
    {
      id: 2,
      title: 'Catlink Pro-X Unboxing & Setup',
      videoUrl: 'https://example.com/unboxing-video.mp4',
      thumbnail: 'https://via.placeholder.com/300x200',
      views: 156000,
      engagement: 9.8,
      conversionRate: 3.5,
      platform: 'TikTok'
    },
    {
      id: 3,
      title: 'Multi-Cat Household Test',
      videoUrl: 'https://example.com/multi-cat-video.mp4',
      thumbnail: 'https://via.placeholder.com/300x200',
      views: 98000,
      engagement: 15.2,
      conversionRate: 5.1,
      platform: 'Instagram'
    },
  ];

  // User feedback analysis
  const userFeedbackData = [
    { category: 'Setup Ease', positive: 85, negative: 15 },
    { category: 'App Experience', positive: 70, negative: 30 },
    { category: 'Odor Control', positive: 75, negative: 25 },
    { category: 'Multi-Cat Use', positive: 90, negative: 10 },
    { category: 'Value for Money', positive: 92, negative: 8 },
    { category: 'Durability', positive: 65, negative: 35 },
  ];

  const columns = [
    {
      title: 'Content',
      dataIndex: 'title',
      key: 'title',
      width: '40%',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      render: (platform) => <Tag color="blue">{platform}</Tag>,
    },
    {
      title: 'Views',
      dataIndex: 'views',
      key: 'views',
      render: (views) => views.toLocaleString(),
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      key: 'roi',
      render: (roi) => <span style={{ color: '#52c41a' }}>{roi}x</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { trending: 'gold', stable: 'green', growing: 'blue' };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  const formatValue = (value, format) => {
    if (format === 'short') {
      if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
      if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toLocaleString();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Overview</h1>
        <Space>
          <Select value={selectedMetric} onChange={setSelectedMetric} style={{ width: 150 }}>
            <Option value="revenue">Revenue Focus</Option>
            <Option value="engagement">Engagement Focus</Option>
            <Option value="reach">Reach Focus</Option>
            <Option value="conversions">Conversion Focus</Option>
          </Select>
          <RangePicker onChange={setDateRange} />
        </Space>
      </div>

      <Alert
        message="Performance Update"
        description="Your content performance has increased by 15.3% compared to last period. TikTok showing strongest engagement rates."
        type="success"
        showIcon
        closable
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={kpiData.revenue.value}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#3f8600' }}>
                  <ArrowUpOutlined /> {kpiData.revenue.trend}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Engagement Rate"
              value={kpiData.engagement.value}
              precision={1}
              valueStyle={{ color: '#1890ff' }}
              prefix={<RiseOutlined />}
              suffix="%"
            />
            <Progress percent={kpiData.engagement.value * 10} showInfo={false} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Reach"
              value={formatValue(kpiData.reach.value, 'short')}
              valueStyle={{ color: '#722ed1' }}
              prefix={<UserOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#3f8600' }}>
                  <ArrowUpOutlined /> {kpiData.reach.trend}%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Conversions"
              value={kpiData.conversions.value}
              precision={0}
              valueStyle={{ color: kpiData.conversions.trend > 0 ? '#3f8600' : '#cf1322' }}
              prefix={<VideoCameraOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#cf1322' }}>
                  <ArrowDownOutlined /> {Math.abs(kpiData.conversions.trend)}%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="Performance Trends" extra={<Tag color="blue">{selectedMetric.toUpperCase()}</Tag>}>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#1890ff" fill="#1890ff" fillOpacity={0.6} />
                <Area type="monotone" dataKey="views" stroke="#52c41a" fill="#52c41a" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Platform Distribution">
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={platformData}
                  dataKey="revenue"
                  nameKey="platform"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ platform, percent }) => `${platform}: ${(percent * 100).toFixed(0)}%`}
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={['#1890ff', '#52c41a', '#faad14', '#f5222d'][index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="Content Performance Matrix">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Current Period" dataKey="A" stroke="#1890ff" fill="#1890ff" fillOpacity={0.6} />
                <Radar name="Previous Period" dataKey="B" stroke="#f5222d" fill="#f5222d" fillOpacity={0.6} />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top Performing Content">
            <Table
              columns={columns}
              dataSource={topContent}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Platform Performance Comparison">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis yAxisId="left" orientation="left" stroke="#1890ff" />
                <YAxis yAxisId="right" orientation="right" stroke="#52c41a" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="views" fill="#1890ff" name="Views" />
                <Bar yAxisId="right" dataKey="engagement" fill="#52c41a" name="Engagement %" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Divider style={{ margin: '40px 0' }}>Product Analysis</Divider>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card 
            title="Competitive Product Analysis - Smart Litter Box Market"
            extra={
              <Select value={selectedProduct} onChange={setSelectedProduct} style={{ width: 150 }}>
                <Option value="litter-box">Smart Litter Box</Option>
                <Option value="garment-steamer">Garment Steamer</Option>
              </Select>
            }
          >
            <Tabs defaultActiveKey="1">
              <TabPane tab="Feature Comparison" key="1">
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={featureComparisonRadar}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="feature" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="Catlink" dataKey="catlink" stroke="#52c41a" fill="#52c41a" fillOpacity={0.6} />
                    <Radar name="Litter-Robot" dataKey="litterRobot" stroke="#1890ff" fill="#1890ff" fillOpacity={0.6} />
                    <Radar name="Leo's Loo" dataKey="leosLoo" stroke="#faad14" fill="#faad14" fillOpacity={0.6} />
                    <Radar name="PetSnowy" dataKey="petSnowy" stroke="#eb2f96" fill="#eb2f96" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </TabPane>
              <TabPane tab="Price Analysis" key="2">
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="price" name="Price ($)" />
                    <YAxis dataKey="features" name="Feature Score" />
                    <ZAxis dataKey="warranty" range={[100, 400]} name="Warranty (years)" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter name="Smart Litter Boxes" data={litterBoxComparison} fill="#1890ff">
                      {litterBoxComparison.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 0 ? '#52c41a' : '#1890ff'} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
                <div style={{ marginTop: 16 }}>
                  {litterBoxComparison.map((product, index) => (
                    <Tag key={index} color={index === 0 ? 'green' : 'blue'} style={{ margin: 4 }}>
                      {product.brand}: ${product.price}
                    </Tag>
                  ))}
                </div>
              </TabPane>
              <TabPane tab="User Feedback" key="3">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={userFeedbackData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="positive" stackId="a" fill="#52c41a" name="Positive Feedback" />
                    <Bar dataKey="negative" stackId="a" fill="#ff4d4f" name="Negative Feedback" />
                  </BarChart>
                </ResponsiveContainer>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Market Share Analysis">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={marketShareData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {marketShareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: 16 }}>
              <Statistic
                title="Catlink Market Position"
                value={15}
                suffix="%"
                prefix={<ThunderboltOutlined />}
                valueStyle={{ color: '#52c41a' }}
              />
              <Progress percent={15} strokeColor="#52c41a" showInfo={false} />
              <Tag color="green" style={{ marginTop: 8 }}>Growing Market Share</Tag>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="Customer Satisfaction Timeline">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={satisfactionTimeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[50, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="catlink" stroke="#52c41a" strokeWidth={2} name="Catlink" />
                <Line type="monotone" dataKey="litterRobot" stroke="#1890ff" strokeWidth={2} name="Litter-Robot" />
                <Line type="monotone" dataKey="leosLoo" stroke="#faad14" strokeWidth={2} name="Leo's Loo" />
                <Line type="monotone" dataKey="petSnowy" stroke="#eb2f96" strokeWidth={2} name="PetSnowy" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Product Video Content Performance">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {productContentPerformance.map((video) => (
                <div
                  key={video.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: 12,
                    border: '1px solid #f0f0f0',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                  onClick={() => setSelectedVideo(video)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1890ff';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#f0f0f0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <PlayCircleOutlined style={{ fontSize: 24, color: '#1890ff', marginRight: 12 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500 }}>{video.title}</div>
                    <Space size="small" style={{ marginTop: 4 }}>
                      <Tag color="blue">{video.platform}</Tag>
                      <span style={{ color: '#999' }}>{video.views.toLocaleString()} views</span>
                      <span style={{ color: '#52c41a' }}>{video.engagement}% engagement</span>
                    </Space>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#1890ff', fontWeight: 500 }}>{video.conversionRate}%</div>
                    <div style={{ fontSize: 12, color: '#999' }}>conversion</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="Product Comparison Matrix">
            <Table
              dataSource={litterBoxComparison}
              rowKey="brand"
              pagination={false}
              columns={[
                {
                  title: 'Brand',
                  dataIndex: 'brand',
                  key: 'brand',
                  render: (text) => (
                    <span style={{ fontWeight: text === 'Catlink Pro-X' ? 'bold' : 'normal', color: text === 'Catlink Pro-X' ? '#52c41a' : 'inherit' }}>
                      {text}
                    </span>
                  ),
                },
                {
                  title: 'Price',
                  dataIndex: 'price',
                  key: 'price',
                  render: (price) => `$${price}`,
                  sorter: (a, b) => a.price - b.price,
                },
                {
                  title: 'Features Score',
                  dataIndex: 'features',
                  key: 'features',
                  render: (score) => <Progress percent={score} size="small" />,
                },
                {
                  title: 'Warranty',
                  dataIndex: 'warranty',
                  key: 'warranty',
                  render: (years) => <Tag color={years >= 2 ? 'green' : 'orange'}>{years} year{years > 1 ? 's' : ''}</Tag>,
                },
                {
                  title: 'Customer Service',
                  dataIndex: 'customerService',
                  key: 'customerService',
                  render: (score) => <Rate disabled defaultValue={score / 20} style={{ fontSize: 14 }} />,
                },
                {
                  title: 'Key Strength',
                  key: 'strength',
                  render: (_, record) => {
                    if (record.brand === 'Catlink Pro-X') return <Tag color="green">Best Value</Tag>;
                    if (record.brand === 'Litter-Robot 4') return <Tag color="blue">Premium Features</Tag>;
                    if (record.brand === "Leo's Loo Too") return <Tag color="gold">Quietest</Tag>;
                    if (record.brand === 'PetSnowy SNOW+') return <Tag color="purple">Anti-Tracking</Tag>;
                  },
                },
              ]}
            />
          </Card>
        </Col>
      </Row>

      {selectedVideo && (
        <VideoPreview
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;