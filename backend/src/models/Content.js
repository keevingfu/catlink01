import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Content = sequelize.define('Content', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  type_key: {
    type: DataTypes.STRING,
  },
  published_at: {
    type: DataTypes.DATE,
  },
  url: {
    type: DataTypes.STRING,
  },
  thumbnail_url: {
    type: DataTypes.STRING,
  },
  video_url: {
    type: DataTypes.STRING,
  },
  creator_id: {
    type: DataTypes.INTEGER,
  },
  account_id: {
    type: DataTypes.INTEGER,
  },
  duration_seconds: {
    type: DataTypes.INTEGER,
  },
  language: {
    type: DataTypes.STRING,
  },
  hashtags: {
    type: DataTypes.JSON,
  },
  mentions: {
    type: DataTypes.JSON,
  },
});

export const ContentPerformance = sequelize.define('ContentPerformance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Content,
      key: 'id',
    },
  },
  platform: {
    type: DataTypes.STRING,
  },
  view_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  like_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  comment_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  share_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  save_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  engagement_rate: {
    type: DataTypes.FLOAT,
  },
  reach: {
    type: DataTypes.INTEGER,
  },
  impressions: {
    type: DataTypes.INTEGER,
  },
  click_through_rate: {
    type: DataTypes.FLOAT,
  },
  average_watch_time: {
    type: DataTypes.FLOAT,
  },
  completion_rate: {
    type: DataTypes.FLOAT,
  },
  data_refresh_time: {
    type: DataTypes.DATE,
  },
});

export const ContentFeature = sequelize.define('ContentFeature', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Content,
      key: 'id',
    },
  },
  feature_type: {
    type: DataTypes.ENUM('visual', 'audio', 'textual', 'emotional', 'technical', 'video'),
    allowNull: false,
  },
  feature_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  feature_value: {
    type: DataTypes.JSON,
  },
  confidence_score: {
    type: DataTypes.FLOAT,
  },
  extracted_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  extraction_method: {
    type: DataTypes.STRING,
  },
});

// Model associations
Content.hasMany(ContentPerformance, { foreignKey: 'content_id' });
ContentPerformance.belongsTo(Content, { foreignKey: 'content_id' });

Content.hasMany(ContentFeature, { foreignKey: 'content_id' });
ContentFeature.belongsTo(Content, { foreignKey: 'content_id' });