import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Select, DatePicker, Space, Table, Tag, Progress, Statistic, Avatar, Button, List, Badge, Tooltip, Rate, Dropdown, Menu } from 'antd';
import { UserOutlined, TeamOutlined, RiseOutlined, FallOutlined, HeartOutlined, CommentOutlined, ShareAltOutlined, PlayCircleOutlined, CrownOutlined, VerifiedOutlined, SyncOutlined, GlobalOutlined, DollarOutlined, StarOutlined, MoreOutlined } from '@ant-design/icons';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter } from 'recharts';
import ReactPlayer from 'react-player';
import './index.css';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Option } = Select;

const KOLAnalysis = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedKOL, setSelectedKOL] = useState(null);
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // KOL performance data
  const kolData = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahpets',
      avatar: 'https://via.placeholder.com/50',
      verified: true,
      tier: 'macro',
      platforms: ['TikTok', 'YouTube', 'Instagram'],
      followers: 1250000,
      engagement_rate: 8.5,
      avg_views: 450000,
      posts_30d: 28,
      roas: 4.2,
      audience_match: 92,
      content_quality: 4.8,
      response_rate: 95,
      categories: ['Pet Care', 'Technology'],
      recent_collab: 'Smart Litter Box Review',
      collab_performance: 'excellent',
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@techpetguy',
      avatar: 'https://via.placeholder.com/50',
      verified: true,
      tier: 'micro',
      platforms: ['YouTube', 'Facebook'],
      followers: 85000,
      engagement_rate: 12.3,
      avg_views: 25000,
      posts_30d: 15,
      roas: 5.8,
      audience_match: 88,
      content_quality: 4.5,
      response_rate: 100,
      categories: ['Technology', 'Reviews'],
      recent_collab: 'Catlink Pro Setup Guide',
      collab_performance: 'excellent',
    },
    {
      id: 3,
      name: 'Emma Wilson',
      username: '@catlady_emma',
      avatar: 'https://via.placeholder.com/50',
      verified: false,
      tier: 'nano',
      platforms: ['Instagram', 'TikTok'],
      followers: 15000,
      engagement_rate: 18.5,
      avg_views: 8000,
      posts_30d: 42,
      roas: 3.2,
      audience_match: 78,
      content_quality: 4.2,
      response_rate: 85,
      categories: ['Lifestyle', 'Pet Care'],
      recent_collab: 'Daily Cat Routine',
      collab_performance: 'good',
    },
    {
      id: 4,
      name: 'David Lee',
      username: '@pettech_david',
      avatar: 'https://via.placeholder.com/50',
      verified: true,
      tier: 'mega',
      platforms: ['YouTube', 'TikTok', 'Instagram'],
      followers: 3500000,
      engagement_rate: 6.2,
      avg_views: 1200000,
      posts_30d: 20,
      roas: 3.8,
      audience_match: 85,
      content_quality: 4.6,
      response_rate: 80,
      categories: ['Technology', 'Education'],
      recent_collab: 'Future of Pet Tech',
      collab_performance: 'good',
    },
  ];

  // Self-operated account data
  const selfKOCData = [
    {
      id: 1,
      account: 'Catlink Official',
      platform: 'TikTok',
      followers: 125000,
      growth_30d: 15.5,
      engagement: 9.2,
      posts_30d: 35,
      viral_posts: 3,
      conversion_rate: 4.5,
      top_content: 'Smart Features Demo',
    },
    {
      id: 2,
      account: 'Catlink Care',
      platform: 'Instagram',
      followers: 68000,
      growth_30d: 8.2,
      engagement: 11.5,
      posts_30d: 28,
      viral_posts: 1,
      conversion_rate: 3.8,
      top_content: 'User Stories',
    },
    {
      id: 3,
      account: 'Catlink Tech',
      platform: 'YouTube',
      followers: 45000,
      growth_30d: 12.3,
      engagement: 7.8,
      posts_30d: 12,
      viral_posts: 2,
      conversion_rate: 5.2,
      top_content: 'Installation Guides',
    },
  ];

  // Engagement metrics over time
  const engagementTrend = [
    { month: 'Jan', kol: 8.2, selfkoc: 9.5, industry: 6.5 },
    { month: 'Feb', kol: 8.5, selfkoc: 9.8, industry: 6.8 },
    { month: 'Mar', kol: 9.1, selfkoc: 10.2, industry: 7.0 },
    { month: 'Apr', kol: 8.8, selfkoc: 11.5, industry: 6.9 },
    { month: 'May', kol: 9.3, selfkoc: 10.8, industry: 7.2 },
    { month: 'Jun', kol: 9.5, selfkoc: 11.2, industry: 7.1 },
  ];

  // Audience quality metrics
  const audienceQuality = [
    { metric: 'Age Match', kol: 85, selfkoc: 92, max: 100 },
    { metric: 'Location Match', kol: 78, selfkoc: 88, max: 100 },
    { metric: 'Interest Match', kol: 90, selfkoc: 95, max: 100 },
    { metric: 'Purchase Intent', kol: 72, selfkoc: 85, max: 100 },
    { metric: 'Brand Affinity', kol: 68, selfkoc: 90, max: 100 },
  ];

  // Platform performance comparison
  const platformPerformance = [
    { platform: 'TikTok', reach: 2500000, engagement: 9.5, conversion: 4.2 },
    { platform: 'Instagram', reach: 1800000, engagement: 8.2, conversion: 3.8 },
    { platform: 'YouTube', reach: 1200000, engagement: 7.8, conversion: 5.5 },
    { platform: 'Facebook', reach: 800000, engagement: 6.5, conversion: 3.2 },
  ];

  const kolColumns = [
    {
      title: 'Influencer',
      fixed: 'left',
      width: 200,
      render: (_, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 500 }}>
              {record.name} {record.verified && <VerifiedOutlined style={{ color: '#1890ff' }} />}
            </div>
            <div style={{ fontSize: 12, color: '#666' }}>{record.username}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Tier',
      dataIndex: 'tier',
      width: 100,
      render: (tier) => {
        const colors = {
          mega: 'purple',
          macro: 'gold',
          micro: 'blue',
          nano: 'green',
        };
        return <Tag color={colors[tier]}>{tier.toUpperCase()}</Tag>;
      },
      filters: [
        { text: 'Mega', value: 'mega' },
        { text: 'Macro', value: 'macro' },
        { text: 'Micro', value: 'micro' },
        { text: 'Nano', value: 'nano' },
      ],
      onFilter: (value, record) => record.tier === value,
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      width: 120,
      render: (followers) => {
        if (followers >= 1000000) return `${(followers / 1000000).toFixed(1)}M`;
        if (followers >= 1000) return `${(followers / 1000).toFixed(0)}K`;
        return followers;
      },
      sorter: (a, b) => a.followers - b.followers,
    },
    {
      title: 'Engagement',
      dataIndex: 'engagement_rate',
      width: 120,
      render: (rate) => (
        <Space>
          <Progress
            type="circle"
            percent={rate * 10}
            width={40}
            format={() => `${rate}%`}
            strokeColor={rate > 10 ? '#52c41a' : rate > 5 ? '#1890ff' : '#faad14'}
          />
        </Space>
      ),
      sorter: (a, b) => a.engagement_rate - b.engagement_rate,
    },
    {
      title: 'ROAS',
      dataIndex: 'roas',
      width: 100,
      render: (roas) => (
        <Tag color={roas > 4 ? 'green' : roas > 2 ? 'blue' : 'orange'}>
          {roas}x
        </Tag>
      ),
      sorter: (a, b) => a.roas - b.roas,
    },
    {
      title: 'Audience Match',
      dataIndex: 'audience_match',
      width: 130,
      render: (match) => (
        <Progress percent={match} size="small" strokeColor="#1890ff" />
      ),
    },
    {
      title: 'Quality',
      dataIndex: 'content_quality',
      width: 120,
      render: (quality) => <Rate disabled defaultValue={quality} style={{ fontSize: 14 }} />,
    },
    {
      title: 'Recent Collab',
      dataIndex: 'recent_collab',
      width: 180,
      render: (collab, record) => (
        <Space direction="vertical" size="small">
          <span>{collab}</span>
          <Tag color={record.collab_performance === 'excellent' ? 'green' : 'blue'}>
            {record.collab_performance.toUpperCase()}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Actions',
      fixed: 'right',
      width: 100,
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="profile" onClick={() => setSelectedKOL(record)}>
                View Profile
              </Menu.Item>
              <Menu.Item key="contact">Contact</Menu.Item>
              <Menu.Item key="analyze">Deep Analysis</Menu.Item>
              <Menu.Item key="history">Collab History</Menu.Item>
            </Menu>
          }
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const selfKOCColumns = [
    {
      title: 'Account',
      dataIndex: 'account',
      render: (account, record) => (
        <Space>
          <Badge status={record.growth_30d > 10 ? 'success' : 'processing'} />
          <span style={{ fontWeight: 500 }}>{account}</span>
        </Space>
      ),
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      render: (platform) => <Tag>{platform}</Tag>,
    },
    {
      title: 'Followers',
      dataIndex: 'followers',
      render: (followers) => followers.toLocaleString(),
      sorter: (a, b) => a.followers - b.followers,
    },
    {
      title: 'Growth (30d)',
      dataIndex: 'growth_30d',
      render: (growth) => (
        <span style={{ color: growth > 0 ? '#52c41a' : '#ff4d4f' }}>
          {growth > 0 ? <RiseOutlined /> : <FallOutlined />} {Math.abs(growth)}%
        </span>
      ),
      sorter: (a, b) => a.growth_30d - b.growth_30d,
    },
    {
      title: 'Engagement',
      dataIndex: 'engagement',
      render: (engagement) => `${engagement}%`,
      sorter: (a, b) => a.engagement - b.engagement,
    },
    {
      title: 'Posts (30d)',
      dataIndex: 'posts_30d',
      sorter: (a, b) => a.posts_30d - b.posts_30d,
    },
    {
      title: 'Viral Posts',
      dataIndex: 'viral_posts',
      render: (viral) => (
        <Tag color={viral > 0 ? 'gold' : 'default'}>
          {viral} {viral > 0 && <CrownOutlined />}
        </Tag>
      ),
    },
    {
      title: 'Conversion',
      dataIndex: 'conversion_rate',
      render: (rate) => `${rate}%`,
    },
    {
      title: 'Top Content',
      dataIndex: 'top_content',
      render: (content) => (
        <Tooltip title="Click to view">
          <a>{content}</a>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="kol-analysis">
      <div className="page-header">
        <h1>KOL/KOC Analysis</h1>
        <Space>
          <Select value={selectedPlatform} onChange={setSelectedPlatform} style={{ width: 120 }}>
            <Option value="all">All Platforms</Option>
            <Option value="tiktok">TikTok</Option>
            <Option value="instagram">Instagram</Option>
            <Option value="youtube">YouTube</Option>
            <Option value="facebook">Facebook</Option>
          </Select>
          <RangePicker />
          <Button type="primary" icon={<SyncOutlined />}>Sync Data</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total KOLs"
              value={286}
              prefix={<TeamOutlined />}
              suffix={
                <span style={{ fontSize: 14, color: '#3f8600' }}>
                  <RiseOutlined /> 12%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Engagement"
              value={8.5}
              suffix="%"
              prefix={<HeartOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Reach"
              value={15.8}
              suffix="M"
              prefix={<GlobalOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg ROAS"
              value={4.2}
              suffix="x"
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" style={{ marginTop: 24 }}>
        <TabPane tab="KOL Performance" key="1">
          <Card>
            <Table
              columns={kolColumns}
              dataSource={kolData}
              rowKey="id"
              scroll={{ x: 1500 }}
              pagination={{ pageSize: 10 }}
            />
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card title="Engagement Trend Comparison">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={engagementTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip />
                    <Legend />
                    <Line type="monotone" dataKey="kol" stroke="#8884d8" name="KOL Average" strokeWidth={2} />
                    <Line type="monotone" dataKey="selfkoc" stroke="#82ca9d" name="Self KOC" strokeWidth={2} />
                    <Line type="monotone" dataKey="industry" stroke="#ffc658" name="Industry Avg" strokeDasharray="5 5" />
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
                    <Bar yAxisId="left" dataKey="reach" fill="#1890ff" name="Reach" />
                    <Bar yAxisId="right" dataKey="engagement" fill="#52c41a" name="Engagement %" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Self-Operated Accounts" key="2">
          <Card>
            <Table
              columns={selfKOCColumns}
              dataSource={selfKOCData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={16}>
              <Card title="Account Growth Matrix">
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="followers" name="Followers" />
                    <YAxis dataKey="engagement" name="Engagement %" />
                    <RechartsTooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Self KOC Accounts" data={selfKOCData} fill="#8884d8">
                      {selfKOCData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.growth_30d > 10 ? '#52c41a' : '#1890ff'} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Content Performance">
                <List
                  dataSource={[
                    { type: 'Product Demo', posts: 45, avgViews: 125000, engagement: 9.8 },
                    { type: 'User Stories', posts: 38, avgViews: 85000, engagement: 11.2 },
                    { type: 'Educational', posts: 52, avgViews: 65000, engagement: 8.5 },
                    { type: 'Behind Scenes', posts: 28, avgViews: 45000, engagement: 12.5 },
                  ]}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        title={item.type}
                        description={
                          <Space>
                            <span>{item.posts} posts</span>
                            <span>{(item.avgViews / 1000).toFixed(0)}K avg views</span>
                          </Space>
                        }
                      />
                      <Tag color="blue">{item.engagement}%</Tag>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Audience Quality" key="3">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Audience Quality Comparison">
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={audienceQuality}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar name="KOL Audience" dataKey="kol" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Self KOC Audience" dataKey="selfkoc" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Audience Demographics">
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <div>
                    <h4>Age Distribution</h4>
                    <Row gutter={8}>
                      <Col span={6}>18-24: <Progress percent={25} size="small" /></Col>
                      <Col span={6}>25-34: <Progress percent={45} size="small" /></Col>
                      <Col span={6}>35-44: <Progress percent={20} size="small" /></Col>
                      <Col span={6}>45+: <Progress percent={10} size="small" /></Col>
                    </Row>
                  </div>
                  <div>
                    <h4>Top Locations</h4>
                    <List
                      size="small"
                      dataSource={[
                        { location: 'United States', percentage: 35 },
                        { location: 'United Kingdom', percentage: 18 },
                        { location: 'Canada', percentage: 12 },
                        { location: 'Australia', percentage: 8 },
                      ]}
                      renderItem={(item) => (
                        <List.Item>
                          <span>{item.location}</span>
                          <Progress percent={item.percentage} size="small" style={{ width: 200 }} />
                        </List.Item>
                      )}
                    />
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Campaign Insights" key="4">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Recent Campaign Performance">
                <Table
                  dataSource={[
                    {
                      id: 1,
                      campaign: 'Summer Pet Tech',
                      kols: 12,
                      reach: 3500000,
                      engagement: 8.9,
                      conversions: 4250,
                      roas: 4.8,
                      status: 'completed',
                    },
                    {
                      id: 2,
                      campaign: 'Smart Living',
                      kols: 8,
                      reach: 2100000,
                      engagement: 9.5,
                      conversions: 3100,
                      roas: 5.2,
                      status: 'active',
                    },
                    {
                      id: 3,
                      campaign: 'Health Awareness',
                      kols: 15,
                      reach: 4200000,
                      engagement: 7.8,
                      conversions: 3800,
                      roas: 3.9,
                      status: 'completed',
                    },
                  ]}
                  columns={[
                    {
                      title: 'Campaign',
                      dataIndex: 'campaign',
                      render: (text, record) => (
                        <Space>
                          <Badge status={record.status === 'active' ? 'processing' : 'success'} />
                          {text}
                        </Space>
                      ),
                    },
                    {
                      title: 'KOLs',
                      dataIndex: 'kols',
                    },
                    {
                      title: 'Total Reach',
                      dataIndex: 'reach',
                      render: (reach) => `${(reach / 1000000).toFixed(1)}M`,
                    },
                    {
                      title: 'Engagement',
                      dataIndex: 'engagement',
                      render: (eng) => `${eng}%`,
                    },
                    {
                      title: 'Conversions',
                      dataIndex: 'conversions',
                      render: (conv) => conv.toLocaleString(),
                    },
                    {
                      title: 'ROAS',
                      dataIndex: 'roas',
                      render: (roas) => (
                        <Tag color={roas > 4 ? 'green' : 'blue'}>{roas}x</Tag>
                      ),
                    },
                  ]}
                  rowKey="id"
                  pagination={false}
                />
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card title="KOL Tier Performance">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Mega', value: 15, roas: 3.8 },
                        { name: 'Macro', value: 35, roas: 4.2 },
                        { name: 'Micro', value: 80, roas: 5.8 },
                        { name: 'Nano', value: 120, roas: 3.2 },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      <Cell fill="#8884d8" />
                      <Cell fill="#82ca9d" />
                      <Cell fill="#ffc658" />
                      <Cell fill="#ff8c8c" />
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Content Type Performance">
                <List
                  dataSource={[
                    { type: 'Product Reviews', kols: 45, avgEngagement: 9.2, topPerformer: '@sarahpets' },
                    { type: 'Unboxing Videos', kols: 38, avgEngagement: 8.8, topPerformer: '@techpetguy' },
                    { type: 'Tutorial Content', kols: 52, avgEngagement: 7.5, topPerformer: '@pettech_david' },
                    { type: 'Lifestyle Posts', kols: 28, avgEngagement: 11.2, topPerformer: '@catlady_emma' },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Tag color="blue">{item.avgEngagement}%</Tag>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<PlayCircleOutlined style={{ fontSize: 24 }} />}
                        title={item.type}
                        description={`${item.kols} KOLs • Top: ${item.topPerformer}`}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {selectedKOL && (
        <div style={{ marginTop: 24 }}>
          <Card
            title={`${selectedKOL.name} - Detailed Analysis`}
            extra={<Button onClick={() => setSelectedKOL(null)}>Close</Button>}
          >
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic title="Total Followers" value={selectedKOL.followers} />
              </Col>
              <Col span={8}>
                <Statistic title="Engagement Rate" value={selectedKOL.engagement_rate} suffix="%" />
              </Col>
              <Col span={8}>
                <Statistic title="Average ROAS" value={selectedKOL.roas} suffix="x" />
              </Col>
            </Row>
          </Card>
        </div>
      )}
    </div>
  );
};

export default KOLAnalysis;