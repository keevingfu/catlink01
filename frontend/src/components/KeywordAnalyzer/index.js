import React from 'react';
import { Card, Row, Col, Tag, Space, Progress, Tooltip } from 'antd';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { SearchOutlined, DollarOutlined, RiseOutlined } from '@ant-design/icons';

const KeywordAnalyzer = ({ keywords }) => {
  // Process keywords for visualization
  const volumeData = keywords.map(k => ({
    name: k.keyword.split(' ').slice(0, 2).join(' '),
    volume: k.volume,
    cpc: k.cpc,
  }));

  const competitionData = [
    { name: 'Low', value: keywords.filter(k => k.competition === 'low').length, color: '#52c41a' },
    { name: 'Medium', value: keywords.filter(k => k.competition === 'medium').length, color: '#faad14' },
    { name: 'High', value: keywords.filter(k => k.competition === 'high').length, color: '#f5222d' },
  ];

  const trendData = keywords.map(k => ({
    keyword: k.keyword,
    score: k.trend === 'rising' ? 85 : 50,
    potential: k.volume * (k.trend === 'rising' ? 1.5 : 1),
  }));

  return (
    <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
      <Col span={12}>
        <Card title="Keyword Volume & CPC Analysis">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <RechartsTooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="volume" fill="#1890ff" name="Search Volume" />
              <Bar yAxisId="right" dataKey="cpc" fill="#52c41a" name="CPC ($)" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="Competition Distribution">
          <Row gutter={16}>
            <Col span={12}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={competitionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {competitionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Col>
            <Col span={12}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <SearchOutlined /> <strong>Total Keywords</strong>
                  <div style={{ fontSize: 24, color: '#1890ff' }}>{keywords.length}</div>
                </div>
                <div>
                  <DollarOutlined /> <strong>Avg CPC</strong>
                  <div style={{ fontSize: 24, color: '#52c41a' }}>
                    ${(keywords.reduce((sum, k) => sum + k.cpc, 0) / keywords.length).toFixed(2)}
                  </div>
                </div>
                <div>
                  <RiseOutlined /> <strong>Rising Trends</strong>
                  <div style={{ fontSize: 24, color: '#faad14' }}>
                    {keywords.filter(k => k.trend === 'rising').length}
                  </div>
                </div>
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Keyword Opportunity Score">
          <Space direction="vertical" style={{ width: '100%' }}>
            {trendData.map((item, index) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span>{item.keyword}</span>
                  <Tooltip title={`Potential reach: ${item.potential.toLocaleString()}`}>
                    <Tag color={item.score > 70 ? 'gold' : 'blue'}>
                      Score: {item.score}
                    </Tag>
                  </Tooltip>
                </div>
                <Progress 
                  percent={item.score} 
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  size="small"
                />
              </div>
            ))}
          </Space>
        </Card>
      </Col>
    </Row>
  );
};

export default KeywordAnalyzer;