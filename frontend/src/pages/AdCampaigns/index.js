import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Select, DatePicker, Space, Table, Tag, Button, Progress, Statistic, Badge, Tooltip } from 'antd';
import { PlusOutlined, EditOutlined, PauseOutlined, PlayCircleOutlined, CopyOutlined, DollarOutlined, PercentageOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, FunnelChart, Funnel, LabelList } from 'recharts';
import CampaignCreationModal from '../../components/CampaignCreationModal';
import ABTestResults from '../../components/ABTestResults';
import BudgetOptimizer from '../../components/BudgetOptimizer';
import './index.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const AdCampaigns = () => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [platform, setPlatform] = useState('all');

  // Mock campaign data
  const campaigns = [
    {
      id: 1,
      name: 'Summer Product Launch',
      status: 'active',
      platform: ['YouTube', 'TikTok'],
      budget: 50000,
      spent: 32500,
      impressions: 2500000,
      clicks: 125000,
      conversions: 3750,
      revenue: 112500,
      ctr: 5.0,
      cvr: 3.0,
      roas: 3.46,
      startDate: '2024-06-01',
      endDate: '2024-08-31',
    },
    {
      id: 2,
      name: 'Brand Awareness Campaign',
      status: 'active',
      platform: ['Instagram', 'Facebook'],
      budget: 30000,
      spent: 18750,
      impressions: 1800000,
      clicks: 72000,
      conversions: 1440,
      revenue: 43200,
      ctr: 4.0,
      cvr: 2.0,
      roas: 2.30,
      startDate: '2024-05-15',
      endDate: '2024-07-15',
    },
    {
      id: 3,
      name: 'Holiday Season Special',
      status: 'paused',
      platform: ['YouTube', 'Instagram', 'TikTok'],
      budget: 75000,
      spent: 45000,
      impressions: 3500000,
      clicks: 175000,
      conversions: 5250,
      revenue: 157500,
      ctr: 5.0,
      cvr: 3.0,
      roas: 3.50,
      startDate: '2024-11-01',
      endDate: '2024-12-31',
    },
  ];

  // Performance trends data
  const performanceTrends = [
    { date: 'Week 1', impressions: 500000, clicks: 25000, conversions: 750, spend: 6500 },
    { date: 'Week 2', impressions: 620000, clicks: 31000, conversions: 930, spend: 8100 },
    { date: 'Week 3', impressions: 580000, clicks: 29000, conversions: 870, spend: 7500 },
    { date: 'Week 4', impressions: 800000, clicks: 40000, conversions: 1200, spend: 10400 },
  ];

  // Platform performance comparison
  const platformPerformance = [
    { platform: 'YouTube', spend: 15000, revenue: 52500, roas: 3.5, campaigns: 2 },
    { platform: 'TikTok', spend: 12000, revenue: 36000, roas: 3.0, campaigns: 2 },
    { platform: 'Instagram', spend: 18000, revenue: 45000, roas: 2.5, campaigns: 2 },
    { platform: 'Facebook', spend: 8000, revenue: 16000, roas: 2.0, campaigns: 1 },
  ];

  // Conversion funnel data
  const funnelData = [
    { name: 'Impressions', value: 2500000, fill: '#8884d8' },
    { name: 'Clicks', value: 125000, fill: '#83a6ed' },
    { name: 'Landing Page', value: 87500, fill: '#8dd1e1' },
    { name: 'Add to Cart', value: 25000, fill: '#82ca9d' },
    { name: 'Checkout', value: 10000, fill: '#a4de6c' },
    { name: 'Purchase', value: 3750, fill: '#ffc658' },
  ];

  // Target audience performance
  const audiencePerformance = [
    { segment: 'Tech Enthusiasts', ctr: 6.2, cvr: 3.8, spend: 12000, revenue: 45600 },
    { segment: 'Pet Parents 25-35', ctr: 5.5, cvr: 3.2, spend: 15000, revenue: 48000 },
    { segment: 'Urban Professionals', ctr: 4.8, cvr: 2.5, spend: 10000, revenue: 25000 },
    { segment: 'Health Conscious', ctr: 4.2, cvr: 2.0, spend: 8000, revenue: 16000 },
  ];

  const campaignColumns = [
    {
      title: 'Campaign',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Badge status={record.status === 'active' ? 'success' : 'default'} />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Platforms',
      dataIndex: 'platform',
      key: 'platform',
      render: (platforms) => (
        <Space size="small">
          {platforms.map(p => <Tag key={p} color="blue">{p}</Tag>)}
        </Space>
      ),
    },
    {
      title: 'Budget',
      key: 'budget',
      render: (_, record) => (
        <div>
          <Progress 
            percent={Math.round((record.spent / record.budget) * 100)} 
            size="small"
            format={() => `$${record.spent.toLocaleString()}`}
          />
          <small style={{ color: '#888' }}>${record.budget.toLocaleString()} total</small>
        </div>
      ),
    },
    {
      title: 'CTR',
      dataIndex: 'ctr',
      key: 'ctr',
      render: (ctr) => <Tag color="blue">{ctr}%</Tag>,
      sorter: (a, b) => a.ctr - b.ctr,
    },
    {
      title: 'CVR',
      dataIndex: 'cvr',
      key: 'cvr',
      render: (cvr) => <Tag color="green">{cvr}%</Tag>,
      sorter: (a, b) => a.cvr - b.cvr,
    },
    {
      title: 'ROAS',
      dataIndex: 'roas',
      key: 'roas',
      render: (roas) => (
        <Tag color={roas >= 3 ? 'gold' : roas >= 2 ? 'green' : 'red'}>
          {roas}x
        </Tag>
      ),
      sorter: (a, b) => a.roas - b.roas,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => `$${revenue.toLocaleString()}`,
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title={record.status === 'active' ? 'Pause' : 'Resume'}>
            <Button 
              type="text" 
              icon={record.status === 'active' ? <PauseOutlined /> : <PlayCircleOutlined />} 
              size="small" 
            />
          </Tooltip>
          <Tooltip title="Duplicate">
            <Button type="text" icon={<CopyOutlined />} size="small" />
          </Tooltip>
        </Space>
      ),
    },
  ];


  return (
    <div className="ad-campaigns">
      <div className="page-header">
        <h1>Content for Ads</h1>
        <Space>
          <Select value={platform} onChange={setPlatform} style={{ width: 120 }}>
            <Option value="all">All Platforms</Option>
            <Option value="youtube">YouTube</Option>
            <Option value="tiktok">TikTok</Option>
            <Option value="instagram">Instagram</Option>
            <Option value="facebook">Facebook</Option>
          </Select>
          <RangePicker />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowCreationModal(true)}>
            New Campaign
          </Button>
        </Space>
      </div>

      {/* KPI Overview */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Spend"
              value={96250}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#cf1322' }}
              suffix={
                <span style={{ fontSize: 14, color: '#3f8600' }}>
                  <FallOutlined /> 15% under budget
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={313200}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#3f8600' }}
              suffix={
                <span style={{ fontSize: 14, color: '#3f8600' }}>
                  <RiseOutlined /> 22%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average ROAS"
              value={3.25}
              suffix="x"
              valueStyle={{ color: '#3f8600' }}
              prefix={<PercentageOutlined />}
            />
            <Progress percent={81} size="small" strokeColor="#52c41a" />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Campaigns"
              value={2}
              suffix="/ 3"
              prefix={<PlayCircleOutlined />}
            />
            <div style={{ marginTop: 8 }}>
              <Tag color="success">2 Active</Tag>
              <Tag color="warning">1 Paused</Tag>
            </div>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
        <TabPane tab="Campaign Performance" key="1">
          <Card>
            <Table
              columns={campaignColumns}
              dataSource={campaigns}
              rowKey="id"
              pagination={false}
              onRow={(record) => ({
                style: { cursor: 'pointer' },
              })}
            />
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card title="Performance Trends">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#1890ff" name="Clicks" />
                    <Line yAxisId="left" type="monotone" dataKey="conversions" stroke="#52c41a" name="Conversions" />
                    <Line yAxisId="right" type="monotone" dataKey="spend" stroke="#fa8c16" name="Spend ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Platform Performance">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={platformPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="platform" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <RechartsTooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="spend" fill="#fa8c16" name="Spend ($)" />
                    <Bar yAxisId="left" dataKey="revenue" fill="#52c41a" name="Revenue ($)" />
                    <Bar yAxisId="right" dataKey="roas" fill="#1890ff" name="ROAS (x)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Conversion Funnel" key="2">
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <Card title="Conversion Funnel Analysis">
                <ResponsiveContainer width="100%" height={400}>
                  <FunnelChart>
                    <RechartsTooltip />
                    <Funnel dataKey="value" data={funnelData} isAnimationActive>
                      <LabelList position="center" fill="#fff" stroke="none" />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Funnel Metrics">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <span>Click-through Rate</span>
                    <Progress percent={5} format={() => '5.0%'} />
                  </div>
                  <div>
                    <span>Landing to Cart</span>
                    <Progress percent={28.6} format={() => '28.6%'} status="active" />
                  </div>
                  <div>
                    <span>Cart to Checkout</span>
                    <Progress percent={40} format={() => '40.0%'} status="active" />
                  </div>
                  <div>
                    <span>Checkout to Purchase</span>
                    <Progress percent={37.5} format={() => '37.5%'} strokeColor="#52c41a" />
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <Statistic
                      title="Overall Conversion Rate"
                      value={3.0}
                      suffix="%"
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Target Audience" key="3">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Audience Segment Performance">
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ctr" name="CTR %" domain={[0, 'dataMax']} />
                    <YAxis dataKey="cvr" name="CVR %" domain={[0, 'dataMax']} />
                    <ZAxis dataKey="revenue" name="Revenue" range={[100, 500]} />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    <Scatter 
                      name="Audience Segments" 
                      data={audiencePerformance} 
                      fill="#1890ff"
                      label={{ dataKey: 'segment' }}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {audiencePerformance.map((segment, index) => (
              <Col span={6} key={index}>
                <Card>
                  <h4>{segment.segment}</h4>
                  <Statistic
                    title="Revenue"
                    value={segment.revenue}
                    prefix="$"
                    valueStyle={{ fontSize: 20 }}
                  />
                  <Row gutter={16} style={{ marginTop: 16 }}>
                    <Col span={12}>
                      <Statistic
                        title="CTR"
                        value={segment.ctr}
                        suffix="%"
                        valueStyle={{ fontSize: 16 }}
                      />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="CVR"
                        value={segment.cvr}
                        suffix="%"
                        valueStyle={{ fontSize: 16 }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        <TabPane tab="A/B Testing" key="4">
          <ABTestResults />
        </TabPane>

        <TabPane tab="Budget Optimization" key="5">
          <BudgetOptimizer campaigns={campaigns} />
        </TabPane>
      </Tabs>

      {showCreationModal && (
        <CampaignCreationModal
          visible={showCreationModal}
          onClose={() => setShowCreationModal(false)}
          onSuccess={() => {
            setShowCreationModal(false);
            // Refresh campaigns
          }}
        />
      )}
    </div>
  );
};

export default AdCampaigns;