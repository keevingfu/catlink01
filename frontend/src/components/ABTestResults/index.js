import React, { useState } from 'react';
import { Card, Row, Col, Table, Tag, Progress, Statistic, Button, Space, Alert } from 'antd';
import { ExperimentOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ABTestResults = () => {
  const [selectedTest, setSelectedTest] = useState(null);

  // Mock A/B test data
  const testResults = [
    {
      id: 1,
      name: 'Creative Variant Test',
      status: 'active',
      variant_a: {
        name: 'Original Creative',
        impressions: 100000,
        clicks: 4000,
        conversions: 120,
        ctr: 4.0,
        cvr: 3.0,
        spend: 2000,
        revenue: 3600,
      },
      variant_b: {
        name: 'New Creative with CTA',
        impressions: 100000,
        clicks: 5500,
        conversions: 198,
        ctr: 5.5,
        cvr: 3.6,
        spend: 2000,
        revenue: 5940,
      },
      confidence: 95,
      winner: 'variant_b',
      uplift: 37.5,
    },
    {
      id: 2,
      name: 'Audience Targeting Test',
      status: 'completed',
      variant_a: {
        name: 'Broad Audience',
        impressions: 150000,
        clicks: 6000,
        conversions: 150,
        ctr: 4.0,
        cvr: 2.5,
        spend: 3000,
        revenue: 4500,
      },
      variant_b: {
        name: 'Lookalike Audience',
        impressions: 150000,
        clicks: 8250,
        conversions: 280,
        ctr: 5.5,
        cvr: 3.4,
        spend: 3000,
        revenue: 8400,
      },
      confidence: 98,
      winner: 'variant_b',
      uplift: 86.7,
    },
  ];

  const testColumns = [
    {
      title: 'Test Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <ExperimentOutlined />
          <span style={{ fontWeight: 500 }}>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'processing' : 'success'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      key: 'confidence',
      render: (confidence) => (
        <Progress percent={confidence} size="small" strokeColor="#52c41a" />
      ),
    },
    {
      title: 'Winner',
      dataIndex: 'winner',
      key: 'winner',
      render: (winner) => (
        <Tag color="gold" icon={<CheckCircleOutlined />}>
          {winner === 'variant_a' ? 'Variant A' : 'Variant B'}
        </Tag>
      ),
    },
    {
      title: 'Uplift',
      dataIndex: 'uplift',
      key: 'uplift',
      render: (uplift) => (
        <Statistic
          value={uplift}
          suffix="%"
          valueStyle={{ color: '#3f8600', fontSize: 16 }}
        />
      ),
    },
  ];

  const timeSeriesData = [
    { day: 'Day 1', variantA: 2.5, variantB: 3.2 },
    { day: 'Day 2', variantA: 2.8, variantB: 3.5 },
    { day: 'Day 3', variantA: 3.0, variantB: 3.6 },
    { day: 'Day 4', variantA: 2.9, variantB: 3.8 },
    { day: 'Day 5', variantA: 3.0, variantB: 3.9 },
    { day: 'Day 6', variantA: 3.1, variantB: 4.1 },
    { day: 'Day 7', variantA: 3.0, variantB: 3.6 },
  ];

  return (
    <div className="ab-test-results">
      <Alert
        message="A/B Testing Best Practices"
        description="Always run tests for at least 2 weeks to account for weekly variations. Ensure statistical significance before making decisions."
        type="info"
        showIcon
        closable
        style={{ marginBottom: 16 }}
      />

      <Card title="Active A/B Tests" style={{ marginBottom: 16 }}>
        <Table
          columns={testColumns}
          dataSource={testResults}
          rowKey="id"
          pagination={false}
          onRow={(record) => ({
            onClick: () => setSelectedTest(record),
            style: { cursor: 'pointer' },
          })}
        />
      </Card>

      {selectedTest && (
        <Card title={`Test Details: ${selectedTest.name}`}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card size="small" title="Variant A: Original">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic
                      title="CTR"
                      value={selectedTest.variant_a.ctr}
                      suffix="%"
                      valueStyle={{ fontSize: 20 }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="CVR"
                      value={selectedTest.variant_a.cvr}
                      suffix="%"
                      valueStyle={{ fontSize: 20 }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Revenue"
                      value={selectedTest.variant_a.revenue}
                      prefix="$"
                      valueStyle={{ fontSize: 20 }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="ROAS"
                      value={(selectedTest.variant_a.revenue / selectedTest.variant_a.spend).toFixed(2)}
                      suffix="x"
                      valueStyle={{ fontSize: 20 }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                size="small" 
                title={
                  <Space>
                    <span>Variant B: New</span>
                    {selectedTest.winner === 'variant_b' && <Tag color="gold">WINNER</Tag>}
                  </Space>
                }
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic
                      title="CTR"
                      value={selectedTest.variant_b.ctr}
                      suffix="%"
                      valueStyle={{ fontSize: 20, color: '#3f8600' }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="CVR"
                      value={selectedTest.variant_b.cvr}
                      suffix="%"
                      valueStyle={{ fontSize: 20, color: '#3f8600' }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="Revenue"
                      value={selectedTest.variant_b.revenue}
                      prefix="$"
                      valueStyle={{ fontSize: 20, color: '#3f8600' }}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic
                      title="ROAS"
                      value={(selectedTest.variant_b.revenue / selectedTest.variant_b.spend).toFixed(2)}
                      suffix="x"
                      valueStyle={{ fontSize: 20, color: '#3f8600' }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Card title="Conversion Rate Over Time" style={{ marginTop: 16 }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="variantA" stroke="#8884d8" name="Variant A" />
                <Line type="monotone" dataKey="variantB" stroke="#82ca9d" name="Variant B" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={8}>
              <Button type="primary" block>
                Apply Winner to Campaign
              </Button>
            </Col>
            <Col span={8}>
              <Button block>
                Continue Testing
              </Button>
            </Col>
            <Col span={8}>
              <Button danger block>
                End Test
              </Button>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  );
};

export default ABTestResults;