import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Select, DatePicker, Space, Table, Tag, Progress, Statistic, Alert, List, Input } from 'antd';
import { LineChartOutlined, RiseOutlined, FallOutlined, FireOutlined, SearchOutlined, ClockCircleOutlined, ThunderboltOutlined, BulbOutlined } from '@ant-design/icons';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrendPredictionChart from '../../components/TrendPredictionChart';
import KeywordAnalyzer from '../../components/KeywordAnalyzer';
import './index.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;

const TrendsForecasting = () => {
  const [selectedTrendType, setSelectedTrendType] = useState('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('global');

  // Trending topics data
  const trendingTopics = [
    {
      id: 1,
      topic: 'Smart Pet Technology',
      category: 'Technology',
      growth_rate: 156,
      volume: 125000,
      peak_date: '2024-06-15',
      status: 'rising',
      platforms: ['TikTok', 'YouTube'],
      confidence: 92,
    },
    {
      id: 2,
      topic: 'Eco-Friendly Cat Products',
      category: 'Sustainability',
      growth_rate: 89,
      volume: 78000,
      peak_date: '2024-07-20',
      status: 'rising',
      platforms: ['Instagram', 'Facebook'],
      confidence: 85,
    },
    {
      id: 3,
      topic: 'Cat Health Monitoring',
      category: 'Health',
      growth_rate: 45,
      volume: 92000,
      peak_date: '2024-05-10',
      status: 'stable',
      platforms: ['YouTube', 'Facebook'],
      confidence: 78,
    },
    {
      id: 4,
      topic: 'Automated Litter Solutions',
      category: 'Convenience',
      growth_rate: -12,
      volume: 56000,
      peak_date: '2024-03-22',
      status: 'declining',
      platforms: ['TikTok'],
      confidence: 65,
    },
  ];

  // Search keyword trends
  const keywordData = [
    { keyword: 'smart litter box', volume: 45000, cpc: 2.35, competition: 'high', trend: 'rising' },
    { keyword: 'automatic cat feeder', volume: 38000, cpc: 1.85, competition: 'medium', trend: 'stable' },
    { keyword: 'cat health tracker', volume: 28000, cpc: 3.15, competition: 'low', trend: 'rising' },
    { keyword: 'self cleaning litter', volume: 52000, cpc: 2.75, competition: 'high', trend: 'stable' },
    { keyword: 'pet camera monitor', volume: 31000, cpc: 1.95, competition: 'medium', trend: 'rising' },
  ];

  // Trend lifecycle data
  const trendLifecycle = [
    { phase: 'Discovery', date: 'Jan', value: 100 },
    { phase: 'Early Adoption', date: 'Feb', value: 250 },
    { phase: 'Growth', date: 'Mar', value: 580 },
    { phase: 'Peak', date: 'Apr', value: 850 },
    { phase: 'Maturity', date: 'May', value: 780 },
    { phase: 'Decline', date: 'Jun', value: 620 },
  ];

  // Regional trend variations
  const regionalData = [
    { region: 'North America', trend1: 85, trend2: 72, trend3: 68, trend4: 45 },
    { region: 'Europe', trend1: 78, trend2: 88, trend3: 62, trend4: 52 },
    { region: 'Asia Pacific', trend1: 92, trend2: 65, trend3: 78, trend4: 38 },
    { region: 'Latin America', trend1: 62, trend2: 58, trend3: 72, trend4: 48 },
  ];

  // Prediction accuracy metrics
  const predictionAccuracy = [
    { month: 'Jan', predicted: 45000, actual: 43500, accuracy: 96.7 },
    { month: 'Feb', predicted: 52000, actual: 51200, accuracy: 98.5 },
    { month: 'Mar', predicted: 48000, actual: 49500, accuracy: 97.0 },
    { month: 'Apr', predicted: 58000, actual: 57200, accuracy: 98.6 },
    { month: 'May', predicted: 61000, actual: 59800, accuracy: 98.0 },
    { month: 'Jun', predicted: 65000, actual: null, accuracy: null },
  ];

  const trendColumns = [
    {
      title: 'Topic',
      dataIndex: 'topic',
      key: 'topic',
      render: (text, record) => (
        <Space>
          <FireOutlined style={{ color: record.status === 'rising' ? '#ff4d4f' : '#888' }} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat) => <Tag color="blue">{cat}</Tag>,
    },
    {
      title: 'Growth Rate',
      dataIndex: 'growth_rate',
      key: 'growth_rate',
      render: (rate) => (
        <span style={{ color: rate > 0 ? '#52c41a' : '#ff4d4f' }}>
          {rate > 0 ? <RiseOutlined /> : <FallOutlined />} {Math.abs(rate)}%
        </span>
      ),
      sorter: (a, b) => a.growth_rate - b.growth_rate,
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      render: (vol) => vol.toLocaleString(),
      sorter: (a, b) => a.volume - b.volume,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          rising: 'gold',
          stable: 'green',
          declining: 'red',
        };
        return <Tag color={colors[status]}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (conf) => <Progress percent={conf} size="small" strokeColor="#1890ff" />,
    },
    {
      title: 'Platforms',
      dataIndex: 'platforms',
      key: 'platforms',
      render: (platforms) => (
        <Space size="small">
          {platforms.map(p => <Tag key={p}>{p}</Tag>)}
        </Space>
      ),
    },
  ];

  const keywordColumns = [
    {
      title: 'Keyword',
      dataIndex: 'keyword',
      key: 'keyword',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: 'Search Volume',
      dataIndex: 'volume',
      key: 'volume',
      render: (vol) => vol.toLocaleString(),
      sorter: (a, b) => a.volume - b.volume,
    },
    {
      title: 'CPC',
      dataIndex: 'cpc',
      key: 'cpc',
      render: (cpc) => `$${cpc}`,
      sorter: (a, b) => a.cpc - b.cpc,
    },
    {
      title: 'Competition',
      dataIndex: 'competition',
      key: 'competition',
      render: (comp) => {
        const colors = { low: 'green', medium: 'orange', high: 'red' };
        return <Tag color={colors[comp]}>{comp.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend) => (
        <Tag color={trend === 'rising' ? 'gold' : 'blue'}>
          {trend === 'rising' ? <RiseOutlined /> : null} {trend.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div className="trends-forecasting">
      <div className="page-header">
        <h1>Content Insights</h1>
        <Space>
          <Select value={selectedTrendType} onChange={setSelectedTrendType} style={{ width: 150 }}>
            <Option value="all">All Trends</Option>
            <Option value="platform">Platform Trends</Option>
            <Option value="video">Video Trends</Option>
            <Option value="search">Search Trends</Option>
          </Select>
          <Select value={selectedRegion} onChange={setSelectedRegion} style={{ width: 120 }}>
            <Option value="global">Global</Option>
            <Option value="na">North America</Option>
            <Option value="eu">Europe</Option>
            <Option value="apac">Asia Pacific</Option>
          </Select>
          <RangePicker />
        </Space>
      </div>

      <Alert
        message="AI-Powered Trend Detection"
        description="Our machine learning algorithms analyze millions of data points across platforms to identify emerging trends before they peak."
        type="info"
        showIcon
        icon={<BulbOutlined />}
        style={{ marginBottom: 24 }}
      />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Trending Topics"
              value={28}
              prefix={<FireOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#3f8600' }}>
                  <RiseOutlined /> 15%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Growth Rate"
              value={68.5}
              suffix="%"
              prefix={<LineChartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Prediction Accuracy"
              value={97.8}
              suffix="%"
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Time to Peak"
              value={45}
              suffix="days"
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
        <TabPane tab="Trending Topics" key="1">
          <Card>
            <Table
              columns={trendColumns}
              dataSource={trendingTopics}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>

          <Card title="Trend Lifecycle Analysis" style={{ marginTop: 16 }}>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={trendLifecycle}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="value" stroke="#1890ff" fill="#1890ff" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </TabPane>

        <TabPane tab="Keyword Analysis" key="2">
          <Card title="Search Keyword Trends">
            <Space style={{ marginBottom: 16, width: '100%' }}>
              <Search
                placeholder="Search keywords"
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                style={{ width: 400 }}
                onSearch={setSearchKeyword}
              />
            </Space>
            <Table
              columns={keywordColumns}
              dataSource={keywordData}
              rowKey="keyword"
              pagination={{ pageSize: 10 }}
            />
          </Card>

          <KeywordAnalyzer keywords={keywordData} />
        </TabPane>

        <TabPane tab="Regional Variations" key="3">
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Card title="Regional Trend Heatmap">
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={regionalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="trend1" fill="#1890ff" name="Smart Tech" />
                    <Bar dataKey="trend2" fill="#52c41a" name="Eco Products" />
                    <Bar dataKey="trend3" fill="#faad14" name="Health Monitor" />
                    <Bar dataKey="trend4" fill="#f5222d" name="Auto Solutions" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Top Regions">
                <List
                  dataSource={[
                    { region: 'Asia Pacific', score: 92 },
                    { region: 'North America', score: 85 },
                    { region: 'Europe', score: 78 },
                    { region: 'Latin America', score: 62 },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                        <span>{item.region}</span>
                        <Progress percent={item.score} size="small" style={{ width: 100 }} />
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="AI Predictions" key="4">
          <TrendPredictionChart data={predictionAccuracy} />
          
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card title="Predicted Trending Topics (Next 30 Days)">
                <List
                  dataSource={[
                    { topic: 'AI-Powered Pet Care', probability: 85, expectedGrowth: 120 },
                    { topic: 'Subscription Litter Services', probability: 78, expectedGrowth: 95 },
                    { topic: 'Pet Wellness Apps', probability: 72, expectedGrowth: 85 },
                    { topic: 'Smart Feeding Systems', probability: 68, expectedGrowth: 75 },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.topic}
                        description={
                          <Space>
                            <span>Probability: {item.probability}%</span>
                            <span>Expected Growth: +{item.expectedGrowth}%</span>
                          </Space>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Content Recommendations">
                <Alert
                  message="Recommended Actions"
                  description="Based on trend analysis, we recommend creating content around 'AI-Powered Pet Care' and 'Smart Feeding Systems' in the next 2 weeks."
                  type="success"
                  showIcon
                />
                <List
                  style={{ marginTop: 16 }}
                  dataSource={[
                    'Create tutorial videos on AI pet monitoring',
                    'Partner with tech influencers for smart product reviews',
                    'Develop comparison content for automated solutions',
                    'Launch educational series on pet health tracking',
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <Space>
                        <BulbOutlined style={{ color: '#faad14' }} />
                        {item}
                      </Space>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TrendsForecasting;