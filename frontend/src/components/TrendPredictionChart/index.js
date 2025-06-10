import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar } from 'recharts';
import { RiseOutlined, CheckCircleOutlined } from '@ant-design/icons';

const TrendPredictionChart = ({ data }) => {
  // Calculate average accuracy
  const avgAccuracy = data
    .filter(d => d.accuracy !== null)
    .reduce((sum, d) => sum + d.accuracy, 0) / data.filter(d => d.accuracy !== null).length;

  return (
    <Row gutter={[16, 16]}>
      <Col span={18}>
        <Card title="Prediction Accuracy Over Time">
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="predicted" fill="#8884d8" name="Predicted" opacity={0.6} />
              <Bar yAxisId="left" dataKey="actual" fill="#82ca9d" name="Actual" />
              <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#ff7300" name="Accuracy %" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="Average Accuracy"
            value={avgAccuracy.toFixed(1)}
            suffix="%"
            valueStyle={{ color: '#3f8600' }}
            prefix={<CheckCircleOutlined />}
          />
          <div style={{ marginTop: 24 }}>
            <p style={{ marginBottom: 8 }}><strong>Model Performance</strong></p>
            <p style={{ color: '#666', fontSize: 12 }}>
              Our AI model maintains high accuracy in predicting content trends and performance metrics.
            </p>
          </div>
          <div style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 8 }}><strong>Next Update</strong></p>
            <p style={{ color: '#1890ff', fontSize: 14 }}>
              <RiseOutlined /> Daily at 2:00 AM UTC
            </p>
          </div>
        </Card>
      </Col>
    </Row>
  );
};

export default TrendPredictionChart;