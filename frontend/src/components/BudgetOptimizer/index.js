import React, { useState } from 'react';
import { Card, Row, Col, Slider, InputNumber, Button, Space, Alert, Table, Tag, Statistic } from 'antd';
import { CalculatorOutlined, ThunderboltOutlined, DollarOutlined } from '@ant-design/icons';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetOptimizer = ({ campaigns }) => {
  const [totalBudget, setTotalBudget] = useState(155000);
  const [optimizationGoal, setOptimizationGoal] = useState('roas');
  const [budgetAllocation, setBudgetAllocation] = useState({
    'Summer Product Launch': 35,
    'Brand Awareness Campaign': 25,
    'Holiday Season Special': 40,
  });

  // Budget optimization recommendations
  const recommendations = [
    {
      platform: 'YouTube',
      currentBudget: 15000,
      recommendedBudget: 22000,
      expectedROAS: 3.8,
      reason: 'High conversion rate and growing engagement',
      change: '+46.7%',
    },
    {
      platform: 'TikTok',
      currentBudget: 12000,
      recommendedBudget: 18000,
      expectedROAS: 3.5,
      reason: 'Strong performance with younger demographics',
      change: '+50%',
    },
    {
      platform: 'Instagram',
      currentBudget: 18000,
      recommendedBudget: 15000,
      expectedROAS: 2.3,
      reason: 'Declining engagement rates',
      change: '-16.7%',
    },
    {
      platform: 'Facebook',
      currentBudget: 8000,
      recommendedBudget: 5000,
      expectedROAS: 1.8,
      reason: 'Lower ROI compared to other platforms',
      change: '-37.5%',
    },
  ];

  // Budget trend data
  const budgetTrendData = [
    { month: 'Jan', actual: 45000, optimal: 42000 },
    { month: 'Feb', actual: 52000, optimal: 55000 },
    { month: 'Mar', actual: 48000, optimal: 51000 },
    { month: 'Apr', actual: 58000, optimal: 62000 },
    { month: 'May', actual: 61000, optimal: 65000 },
    { month: 'Jun', actual: 55000, optimal: 58000 },
  ];

  // ROI by budget range
  const roiByBudget = [
    { range: '$0-10K', roi: 2.1 },
    { range: '$10K-25K', roi: 2.8 },
    { range: '$25K-50K', roi: 3.2 },
    { range: '$50K-75K', roi: 3.5 },
    { range: '$75K+', roi: 3.3 },
  ];

  const handleBudgetChange = (campaign, value) => {
    const total = Object.values({ ...budgetAllocation, [campaign]: value }).reduce((a, b) => a + b, 0);
    if (total <= 100) {
      setBudgetAllocation({ ...budgetAllocation, [campaign]: value });
    }
  };

  const columns = [
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: 'Current Budget',
      dataIndex: 'currentBudget',
      key: 'currentBudget',
      render: (val) => `$${val.toLocaleString()}`,
    },
    {
      title: 'Recommended',
      dataIndex: 'recommendedBudget',
      key: 'recommendedBudget',
      render: (val) => `$${val.toLocaleString()}`,
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      render: (change) => (
        <Tag color={change.startsWith('+') ? 'green' : 'red'}>
          {change}
        </Tag>
      ),
    },
    {
      title: 'Expected ROAS',
      dataIndex: 'expectedROAS',
      key: 'expectedROAS',
      render: (roas) => <Tag color="gold">{roas}x</Tag>,
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (text) => <small>{text}</small>,
    },
  ];

  const pieData = Object.entries(budgetAllocation).map(([name, value]) => ({
    name,
    value: (totalBudget * value) / 100,
  }));

  const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d'];

  return (
    <div className="budget-optimizer">
      <Alert
        message="Budget Optimization Algorithm"
        description="Our AI-powered optimization uses historical performance data, seasonal trends, and platform-specific metrics to recommend optimal budget allocation."
        type="info"
        showIcon
        icon={<ThunderboltOutlined />}
        style={{ marginBottom: 16 }}
      />

      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Total Budget Configuration">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <span>Total Monthly Budget</span>
                <InputNumber
                  style={{ width: '100%', marginTop: 8 }}
                  value={totalBudget}
                  onChange={setTotalBudget}
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                  min={10000}
                  max={1000000}
                  step={5000}
                />
              </div>

              <div style={{ marginTop: 16 }}>
                <span>Optimization Goal</span>
                <div style={{ marginTop: 8 }}>
                  <Space>
                    <Button 
                      type={optimizationGoal === 'roas' ? 'primary' : 'default'}
                      onClick={() => setOptimizationGoal('roas')}
                    >
                      Maximize ROAS
                    </Button>
                    <Button 
                      type={optimizationGoal === 'conversions' ? 'primary' : 'default'}
                      onClick={() => setOptimizationGoal('conversions')}
                    >
                      Maximize Conversions
                    </Button>
                    <Button 
                      type={optimizationGoal === 'reach' ? 'primary' : 'default'}
                      onClick={() => setOptimizationGoal('reach')}
                    >
                      Maximize Reach
                    </Button>
                  </Space>
                </div>
              </div>
            </Space>
          </Card>
        </Col>

        <Col span={12}>
          <Card title="Budget Allocation">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card title="Campaign Budget Allocation" style={{ marginTop: 16 }}>
        {Object.entries(budgetAllocation).map(([campaign, percentage]) => (
          <div key={campaign} style={{ marginBottom: 16 }}>
            <Row gutter={16} align="middle">
              <Col span={6}>
                <span>{campaign}</span>
              </Col>
              <Col span={12}>
                <Slider
                  value={percentage}
                  onChange={(value) => handleBudgetChange(campaign, value)}
                  marks={{
                    0: '0%',
                    25: '25%',
                    50: '50%',
                    75: '75%',
                    100: '100%',
                  }}
                />
              </Col>
              <Col span={3}>
                <InputNumber
                  min={0}
                  max={100}
                  value={percentage}
                  onChange={(value) => handleBudgetChange(campaign, value)}
                  formatter={(value) => `${value}%`}
                  parser={(value) => value.replace('%', '')}
                />
              </Col>
              <Col span={3}>
                <Statistic
                  value={(totalBudget * percentage) / 100}
                  prefix="$"
                  valueStyle={{ fontSize: 16 }}
                />
              </Col>
            </Row>
          </div>
        ))}
      </Card>

      <Card title="Platform Budget Recommendations" style={{ marginTop: 16 }}>
        <Table
          columns={columns}
          dataSource={recommendations}
          rowKey="platform"
          pagination={false}
        />
      </Card>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card title="Budget vs Performance Trend">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={budgetTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Spend" />
                <Line type="monotone" dataKey="optimal" stroke="#82ca9d" name="Optimal Spend" strokeDashStyle="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="ROI by Budget Range">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={roiByBudget}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="roi" fill="#1890ff" name="ROI (x)" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 16, textAlign: 'center' }}>
        <Space size="large">
          <Button type="primary" icon={<CalculatorOutlined />} size="large">
            Apply Optimized Budget
          </Button>
          <Button icon={<DollarOutlined />} size="large">
            Export Budget Plan
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default BudgetOptimizer;