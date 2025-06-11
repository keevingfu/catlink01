import React, { useState, useEffect } from 'react';
import { Modal, Descriptions, Tag, Space, Statistic, Row, Col, Spin, Alert, Button } from 'antd';
import ReactPlayer from 'react-player';
import { 
  EyeOutlined, 
  LikeOutlined, 
  CommentOutlined, 
  ShareAltOutlined,
  LoadingOutlined,
  ReloadOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import {
  detectPlatform,
  generateEmbedUrl,
  getVideoThumbnail,
  formatPlatformName,
  getPlatformDimensions,
  getPlayerConfig
} from '../../utils/videoParser';
import './index.css';

const VideoPreview = ({ visible, content, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoMetadata, setVideoMetadata] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (content?.videoUrl) {
      loadVideoMetadata();
    }
  }, [content?.videoUrl]);

  const loadVideoMetadata = async () => {
    setLoading(true);
    setError(null);

    try {
      const { embedUrl, platform, id, isValid } = generateEmbedUrl(content.videoUrl);
      
      if (!isValid) {
        throw new Error('Unsupported video URL format');
      }

      // Get thumbnail
      const thumbnailUrl = await getVideoThumbnail(content.videoUrl);
      setThumbnail(thumbnailUrl || content.thumbnail);

      setVideoMetadata({
        embedUrl,
        platform,
        id,
        dimensions: getPlatformDimensions(platform),
        config: getPlayerConfig(platform)
      });

      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to load video');
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(retryCount + 1);
    loadVideoMetadata();
  };

  const renderVideo = () => {
    if (loading) {
      return (
        <div className="video-loading">
          <Spin 
            indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            tip="Loading video..."
          />
        </div>
      );
    }

    if (error) {
      return (
        <div className="video-error">
          <Alert
            message="Video Loading Error"
            description={error}
            type="error"
            showIcon
            action={
              <Button 
                size="small" 
                danger 
                icon={<ReloadOutlined />}
                onClick={handleRetry}
              >
                Retry
              </Button>
            }
          />
        </div>
      );
    }

    if (!videoMetadata) {
      return (
        <div className="video-error">
          <Alert
            message="Video Not Available"
            description="Unable to load video metadata"
            type="warning"
            showIcon
          />
        </div>
      );
    }

    // Special handling for different platforms
    const { platform, embedUrl, dimensions, config } = videoMetadata;

    // For platforms that ReactPlayer doesn't support natively, use iframe
    const useIframe = ['tiktok', 'bilibili', 'instagram'].includes(platform);

    if (useIframe) {
      return (
        <div 
          className="video-iframe-container"
          style={{ 
            position: 'relative',
            paddingBottom: dimensions.aspectRatio === '9:16' ? '177.78%' : 
                         dimensions.aspectRatio === '1:1' ? '100%' : '56.25%',
            height: 0,
            overflow: 'hidden'
          }}
        >
          <iframe
            src={embedUrl}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none'
            }}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            {...(config.attributes || {})}
          />
        </div>
      );
    }

    // Use ReactPlayer for supported platforms
    return (
      <ReactPlayer
        url={videoMetadata.embedUrl || content.videoUrl}
        controls
        width="100%"
        height="400px"
        light={thumbnail}
        playing={false}
        config={config}
        onError={(e) => {
          console.error('Video playback error:', e);
          setError('Failed to play video');
        }}
        fallback={
          <div className="video-loading">
            <Spin 
              indicator={<PlayCircleOutlined style={{ fontSize: 48 }} spin />}
              tip="Preparing video..."
            />
          </div>
        }
      />
    );
  };

  if (!content) return null;

  const platformName = videoMetadata ? formatPlatformName(videoMetadata.platform) : content.platform;

  return (
    <Modal
      title={
        <Space>
          <span>{content.title}</span>
          {videoMetadata && (
            <Tag color="blue">{platformName}</Tag>
          )}
        </Space>
      }
      visible={visible}
      onCancel={onClose}
      width={900}
      footer={null}
      className="video-preview-modal"
      destroyOnClose
    >
      <div className="video-container">
        {renderVideo()}
      </div>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={6}>
          <Statistic
            title="Views"
            value={content.views || 0}
            prefix={<EyeOutlined />}
            formatter={(value) => value.toLocaleString()}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Engagement Rate"
            value={content.engagement || 0}
            suffix="%"
            prefix={<LikeOutlined />}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Comments"
            value={content.comments || 0}
            prefix={<CommentOutlined />}
            formatter={(value) => value.toLocaleString()}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Shares"
            value={content.shares || 0}
            prefix={<ShareAltOutlined />}
            formatter={(value) => value.toLocaleString()}
          />
        </Col>
      </Row>

      <Descriptions style={{ marginTop: 24 }} bordered column={2}>
        <Descriptions.Item label="Platform">
          <Tag color="blue">{platformName}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Content Type">
          <Tag color="green">{content.type || 'Video'}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Published Date">
          {new Date(content.publishedAt || Date.now()).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="ROI">
          <Tag color="gold">{content.roi || 0}x</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Duration">
          {content.duration || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Creator">
          {content.creator || 'Catlink Official'}
        </Descriptions.Item>
        {videoMetadata && (
          <Descriptions.Item label="Video ID" span={2}>
            <code>{videoMetadata.id}</code>
          </Descriptions.Item>
        )}
      </Descriptions>

      {content.description && (
        <div style={{ marginTop: 16 }}>
          <h4>Description</h4>
          <p>{content.description}</p>
        </div>
      )}

      {content.hashtags && content.hashtags.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h4>Hashtags</h4>
          <Space wrap>
            {content.hashtags.map((tag, index) => (
              <Tag key={index} color="blue">#{tag}</Tag>
            ))}
          </Space>
        </div>
      )}

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && videoMetadata && (
        <div style={{ marginTop: 16, padding: 12, background: '#f0f2f5', borderRadius: 4 }}>
          <h4>Debug Info</h4>
          <pre style={{ fontSize: 12 }}>
            {JSON.stringify({
              originalUrl: content.videoUrl,
              embedUrl: videoMetadata.embedUrl,
              platform: videoMetadata.platform,
              dimensions: videoMetadata.dimensions
            }, null, 2)}
          </pre>
        </div>
      )}
    </Modal>
  );
};

export default VideoPreview;