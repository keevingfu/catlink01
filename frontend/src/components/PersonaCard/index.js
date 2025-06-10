import React from 'react';
import { Card, Tag, Progress, Space, Statistic } from 'antd';
import { UserOutlined, DollarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './index.css';

const PersonaCard = ({ persona, onClick, selected }) => {
  return (
    <Card
      className={`persona-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      hoverable
    >
      <div className="persona-header">
        <h3>{persona.name}</h3>
        <Tag color="blue">{persona.percentage}%</Tag>
      </div>
      
      <Space direction="vertical" style={{ width: '100%' }}>
        <div className="persona-info">
          <UserOutlined /> {persona.ageRange} • {persona.gender}
        </div>
        
        <Progress 
          percent={persona.percentage} 
          showInfo={false}
          strokeColor="#1890ff"
        />
        
        <div className="persona-stats">
          <Statistic
            title="Avg Order Value"
            value={persona.avgOrderValue}
            prefix={<DollarOutlined />}
            valueStyle={{ fontSize: 16 }}
          />
          <Statistic
            title="Best Time"
            value={persona.bestEngagementTime}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ fontSize: 14 }}
          />
        </div>
        
        <div className="persona-characteristics">
          <strong>Characteristics:</strong>
          <div className="tags-container">
            {persona.characteristics.map((char, index) => (
              <Tag key={index} color="geekblue">{char}</Tag>
            ))}
          </div>
        </div>
        
        <div className="persona-content-prefs">
          <strong>Preferred Content:</strong>
          <div className="tags-container">
            {persona.preferredContent.map((content, index) => (
              <Tag key={index} color="green">{content}</Tag>
            ))}
          </div>
        </div>
      </Space>
    </Card>
  );
};

export default PersonaCard;