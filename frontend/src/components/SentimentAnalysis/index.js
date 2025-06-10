import React from 'react';
import { Card, Row, Col, Progress, Tag, List, Statistic } from 'antd';
import { SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './index.css';

const SentimentAnalysis = ({ platform }) => {
  const sentimentData = [
    { name: 'Positive', value: 62, color: '#52c41a' },
    { name: 'Neutral', value: 28, color: '#faad14' },
    { name: 'Negative', value: 10, color: '#f5222d' },
  ];

  const topicData = [
    { topic: 'Product Quality', positive: 85, negative: 15 },
    { topic: 'Customer Service', positive: 78, negative: 22 },
    { topic: 'Price Value', positive: 65, negative: 35 },
    { topic: 'App Features', positive: 88, negative: 12 },
    { topic: 'Shipping', positive: 72, negative: 28 },
  ];

  const keywordClouds = {
    positive: ['Amazing', 'Love it', 'Best purchase', 'Highly recommend', 'Great quality'],
    negative: ['Expensive', 'Complex setup', 'App issues', 'Slow response', 'Missing features'],
  };

  const recentComments = [
    {
      id: 1,
      text: 'This smart litter box has changed my life! My cats love it too.',
      sentiment: 'positive',
      platform: 'YouTube',
      engagement: 245,
    },
    {
      id: 2,
      text: 'The app could use some improvements, but overall satisfied.',
      sentiment: 'neutral',
      platform: 'Instagram',
      engagement: 89,
    },
    {
      id: 3,
      text: 'Price is too high for the features offered.',
      sentiment: 'negative',
      platform: 'Facebook',
      engagement: 34,
    },
  ];

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <SmileOutlined style={{ color: '#52c41a' }} />;
      case 'negative':
        return <FrownOutlined style={{ color: '#f5222d' }} />;
      default:
        return <MehOutlined style={{ color: '#faad14' }} />;
    }
  };

  return (
    <div className="sentiment-analysis">
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="Overall Sentiment">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sentimentData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title="Sentiment Score">
            <Statistic
              title="Overall Score"
              value={7.8}
              suffix="/ 10"
              valueStyle={{ color: '#52c41a', fontSize: 48 }}
            />
            <Progress 
              percent={78} 
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
            <div style={{ marginTop: 16 }}>
              <Tag color="green">Positive Trend</Tag>
              <Tag>+5.2% from last month</Tag>
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card title="Key Sentiment Drivers">
            <div className="keyword-cloud">
              <h4>Positive Keywords</h4>
              <div className="keywords">
                {keywordClouds.positive.map((keyword, index) => (
                  <Tag key={index} color="green" style={{ margin: 4 }}>
                    {keyword}
                  </Tag>
                ))}
              </div>
              <h4 style={{ marginTop: 16 }}>Negative Keywords</h4>
              <div className="keywords">
                {keywordClouds.negative.map((keyword, index) => (
                  <Tag key={index} color="red" style={{ margin: 4 }}>
                    {keyword}
                  </Tag>
                ))}
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Card title="Sentiment by Topic" style={{ marginTop: 16 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topicData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="positive" fill="#52c41a" name="Positive %" />
            <Bar dataKey="negative" fill="#f5222d" name="Negative %" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="Recent Comments Analysis" style={{ marginTop: 16 }}>
        <List
          dataSource={recentComments}
          renderItem={(comment) => (
            <List.Item
              extra={
                <div style={{ textAlign: 'right' }}>
                  <Tag>{comment.platform}</Tag>
                  <div style={{ marginTop: 4 }}>
                    <small>{comment.engagement} engagements</small>
                  </div>
                </div>
              }
            >
              <List.Item.Meta
                avatar={getSentimentIcon(comment.sentiment)}
                title={comment.text}
                description={
                  <Tag color={
                    comment.sentiment === 'positive' ? 'green' : 
                    comment.sentiment === 'negative' ? 'red' : 'gold'
                  }>
                    {comment.sentiment.toUpperCase()}
                  </Tag>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default SentimentAnalysis;