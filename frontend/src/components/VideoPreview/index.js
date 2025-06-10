import React from 'react';
import { Modal, Descriptions, Tag, Space, Statistic, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import { EyeOutlined, LikeOutlined, CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
import './index.css';

const VideoPreview = ({ visible, content, onClose }) => {
  if (!content) return null;

  return (
    <Modal
      title={content.title}
      visible={visible}
      onCancel={onClose}
      width={900}
      footer={null}
      className="video-preview-modal"
    >
      <div className="video-container">
        <ReactPlayer
          url={content.videoUrl}
          controls
          width="100%"
          height="400px"
          light={content.thumbnail}
          playing={false}
        />
      </div>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={6}>
          <Statistic
            title="Views"
            value={content.views}
            prefix={<EyeOutlined />}
            formatter={(value) => value.toLocaleString()}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Engagement Rate"
            value={content.engagement}
            suffix="%"
            prefix={<LikeOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Comments"
            value={content.comments || 0}
            prefix={<CommentOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Shares"
            value={content.shares || 0}
            prefix={<ShareAltOutlined />}
          />
        </Col>
      </Row>

      <Descriptions style={{ marginTop: 24 }} bordered column={2}>
        <Descriptions.Item label="Platform">
          <Tag color="blue">{content.platform}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Content Type">
          <Tag color="green">{content.type || 'Video'}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Published Date">
          {new Date(content.publishedAt || Date.now()).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="ROI">
          <Tag color="gold">{content.roi}x</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Duration">
          {content.duration || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Creator">
          {content.creator || 'Catlink Official'}
        </Descriptions.Item>
      </Descriptions>

      {content.description && (
        <div style={{ marginTop: 16 }}>
          <h4>Description</h4>
          <p>{content.description}</p>
        </div>
      )}

      {content.hashtags && (
        <div style={{ marginTop: 16 }}>
          <h4>Hashtags</h4>
          <Space wrap>
            {content.hashtags.map((tag, index) => (
              <Tag key={index} color="blue">#{tag}</Tag>
            ))}
          </Space>
        </div>
      )}
    </Modal>
  );
};

export default VideoPreview;