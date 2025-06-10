import React from 'react';
import { Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import './index.css';

const MetricCard = ({ title, value, prefix, suffix, trend, period, precision = 0 }) => {
  const isPositiveTrend = trend > 0;
  
  return (
    <Card className="metric-card">
      <Statistic
        title={title}
        value={value}
        precision={precision}
        valueStyle={{ color: isPositiveTrend ? '#3f8600' : '#cf1322' }}
        prefix={prefix}
        suffix={suffix}
      />
      {trend !== undefined && (
        <div className="trend-indicator">
          <span style={{ color: isPositiveTrend ? '#3f8600' : '#cf1322' }}>
            {isPositiveTrend ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            {Math.abs(trend)}%
          </span>
          <span className="period">{period}</span>
        </div>
      )}
    </Card>
  );
};

export default MetricCard;