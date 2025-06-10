import React, { useState } from 'react';
import { Card, Row, Col, Tabs, Select, Tag, Space, Progress, Table, Segmented } from 'antd';
import { UserOutlined, HeartOutlined, CommentOutlined, GlobalOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TreeMap, RadialBarChart, RadialBar } from 'recharts';
import PersonaCard from '../../components/PersonaCard';
import SentimentAnalysis from '../../components/SentimentAnalysis';
import './index.css';

const { TabPane } = Tabs;
const { Option } = Select;

const AudienceInsights = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [viewType, setViewType] = useState('overview');

  // Mock persona data
  const personas = [
    {
      id: 1,
      name: 'Tech-Savvy Pet Parents',
      ageRange: '25-35',
      gender: 'Mixed',
      percentage: 35,
      characteristics: ['Early adopters', 'High income', 'Urban lifestyle'],
      preferredContent: ['Product reviews', 'Tech features', 'App tutorials'],
      bestEngagementTime: '7-9 PM',
      avgOrderValue: 285,
    },
    {
      id: 2,
      name: 'Health-Conscious Cat Owners',
      ageRange: '35-45',
      gender: '65% Female',
      percentage: 28,
      characteristics: ['Health focused', 'Research driven', 'Quality oriented'],
      preferredContent: ['Health tips', 'Vet reviews', 'Nutrition guides'],
      bestEngagementTime: '6-8 AM',
      avgOrderValue: 320,
    },
    {
      id: 3,
      name: 'Millennial Cat Enthusiasts',
      ageRange: '22-30',
      gender: '70% Female',
      percentage: 22,
      characteristics: ['Social media active', 'Price conscious', 'Trend followers'],
      preferredContent: ['Cute cat videos', 'Memes', 'User stories'],
      bestEngagementTime: '9-11 PM',
      avgOrderValue: 195,
    },
    {
      id: 4,
      name: 'Premium Pet Care Seekers',
      ageRange: '40-55',
      gender: 'Mixed',
      percentage: 15,
      characteristics: ['High spending', 'Brand loyal', 'Quality focused'],
      preferredContent: ['Premium features', 'Comparisons', 'Expert reviews'],
      bestEngagementTime: '5-7 PM',
      avgOrderValue: 450,
    },
  ];

  // Demographics data
  const ageDistribution = [
    { age: '18-24', value: 15 },
    { age: '25-34', value: 35 },
    { age: '35-44', value: 28 },
    { age: '45-54', value: 15 },
    { age: '55+', value: 7 },
  ];

  const genderDistribution = [
    { name: 'Female', value: 62, color: '#ff7875' },
    { name: 'Male', value: 35, color: '#5cdbd3' },
    { name: 'Other', value: 3, color: '#b37feb' },
  ];

  // Interest categories
  const interestData = [
    { category: 'Pet Health', value: 85, fullMark: 100 },
    { category: 'Technology', value: 72, fullMark: 100 },
    { category: 'Sustainability', value: 68, fullMark: 100 },
    { category: 'Home Automation', value: 64, fullMark: 100 },
    { category: 'Pet Entertainment', value: 78, fullMark: 100 },
  ];

  // Content affinity data
  const contentAffinityData = [
    { type: 'Educational', youtube: 85, tiktok: 65, instagram: 72, facebook: 78 },
    { type: 'Entertainment', youtube: 68, tiktok: 92, instagram: 85, facebook: 62 },
    { type: 'Reviews', youtube: 88, tiktok: 72, instagram: 68, facebook: 75 },
    { type: 'Tutorials', youtube: 82, tiktok: 58, instagram: 65, facebook: 70 },
    { type: 'User Stories', youtube: 65, tiktok: 85, instagram: 88, facebook: 82 },
  ];

  // Behavior patterns
  const behaviorPatterns = [
    { time: '6AM', weekday: 45, weekend: 25 },
    { time: '9AM', weekday: 78, weekend: 35 },
    { time: '12PM', weekday: 65, weekend: 58 },
    { time: '3PM', weekday: 52, weekend: 62 },
    { time: '6PM', weekday: 88, weekend: 75 },
    { time: '9PM', weekday: 92, weekend: 85 },
    { time: '12AM', weekday: 35, weekend: 48 },
  ];

  const columns = [
    {
      title: 'Persona',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <UserOutlined />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (val) => <Progress percent={val} size="small" />,
    },
    {
      title: 'Avg Order Value',
      dataIndex: 'avgOrderValue',
      key: 'avgOrderValue',
      render: (val) => `$${val}`,
    },
    {
      title: 'Best Time',
      dataIndex: 'bestEngagementTime',
      key: 'bestEngagementTime',
      render: (time) => <Tag color="blue">{time}</Tag>,
    },
  ];

  return (
    <div className="audience-insights">
      <div className="page-header">
        <h1>Content for Private</h1>
        <Space>
          <Segmented
            value={viewType}
            onChange={setViewType}
            options={[
              { label: 'Overview', value: 'overview' },
              { label: 'Personas', value: 'personas' },
              { label: 'Behavior', value: 'behavior' },
              { label: 'Sentiment', value: 'sentiment' },
            ]}
          />
          <Select value={selectedPlatform} onChange={setSelectedPlatform} style={{ width: 120 }}>
            <Option value="all">All Platforms</Option>
            <Option value="youtube">YouTube</Option>
            <Option value="tiktok">TikTok</Option>
            <Option value="instagram">Instagram</Option>
            <Option value="facebook">Facebook</Option>
          </Select>
        </Space>
      </div>

      <Tabs activeKey={viewType} onChange={setViewType}>
        <TabPane tab="Overview" key="overview">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card title="Age Distribution">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={ageDistribution}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="age" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#1890ff" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Gender Distribution">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={genderDistribution}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {genderDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Interest Categories">
                <ResponsiveContainer width="100%" height={250}>
                  <RadialBarChart data={interestData} innerRadius="20%" outerRadius="90%">
                    <RadialBar dataKey="value" fill="#1890ff" background />
                    <Legend />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Card title="Content Type Affinity by Platform" style={{ marginTop: 16 }}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={contentAffinityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="youtube" fill="#ff0000" />
                <Bar dataKey="tiktok" fill="#000000" />
                <Bar dataKey="instagram" fill="#e4405f" />
                <Bar dataKey="facebook" fill="#1877f2" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </TabPane>

        <TabPane tab="User Personas" key="personas">
          <Row gutter={[16, 16]}>
            {personas.map((persona) => (
              <Col span={12} key={persona.id}>
                <PersonaCard
                  persona={persona}
                  onClick={() => setSelectedPersona(persona)}
                  selected={selectedPersona?.id === persona.id}
                />
              </Col>
            ))}
          </Row>
          
          <Card title="Persona Comparison" style={{ marginTop: 16 }}>
            <Table
              columns={columns}
              dataSource={personas}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </TabPane>

        <TabPane tab="Behavior Patterns" key="behavior">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Engagement Patterns: Weekday vs Weekend">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={behaviorPatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weekday" stroke="#1890ff" name="Weekday" />
                    <Line type="monotone" dataKey="weekend" stroke="#52c41a" name="Weekend" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col span={12}>
              <Card title="Device Usage">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <span>Mobile</span>
                    <Progress percent={68} />
                  </div>
                  <div>
                    <span>Desktop</span>
                    <Progress percent={22} />
                  </div>
                  <div>
                    <span>Tablet</span>
                    <Progress percent={10} />
                  </div>
                </Space>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Content Consumption Time">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div>
                    <span>Morning (6AM-12PM)</span>
                    <Progress percent={25} status="active" />
                  </div>
                  <div>
                    <span>Afternoon (12PM-6PM)</span>
                    <Progress percent={30} status="active" />
                  </div>
                  <div>
                    <span>Evening (6PM-12AM)</span>
                    <Progress percent={45} status="active" />
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Sentiment Analysis" key="sentiment">
          <SentimentAnalysis platform={selectedPlatform} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AudienceInsights;