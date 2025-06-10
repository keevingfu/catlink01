import React, { useState } from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tag, Space, Select, DatePicker, Alert } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, DollarOutlined, UserOutlined, VideoCameraOutlined, RiseOutlined } from '@ant-design/icons';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import './index.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

const Dashboard = () => {
  const [dateRange, setDateRange] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState('revenue');

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
    </div>
  );
};

export default Dashboard;