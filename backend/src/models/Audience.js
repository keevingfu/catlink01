import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const UserPersona = sequelize.define('UserPersona', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  persona_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age_range: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.STRING,
  },
  location: {
    type: DataTypes.JSON,
  },
  interests: {
    type: DataTypes.JSON,
  },
  behaviors: {
    type: DataTypes.JSON,
  },
  preferred_platforms: {
    type: DataTypes.JSON,
  },
  content_preferences: {
    type: DataTypes.JSON,
  },
  purchase_behavior: {
    type: DataTypes.JSON,
  },
  device_usage: {
    type: DataTypes.JSON,
  },
  active_times: {
    type: DataTypes.JSON,
  },
});

export const AudienceContentAffinity = sequelize.define('AudienceContentAffinity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  persona_id: {
    type: DataTypes.INTEGER,
    references: {
      model: UserPersona,
      key: 'id',
    },
  },
  content_type: {
    type: DataTypes.STRING,
  },
  platform: {
    type: DataTypes.STRING,
  },
  affinity_score: {
    type: DataTypes.FLOAT,
  },
  engagement_metrics: {
    type: DataTypes.JSON,
  },
  sample_size: {
    type: DataTypes.INTEGER,
  },
  calculated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

export const CommentSentimentAnalysis = sequelize.define('CommentSentimentAnalysis', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comment_id: {
    type: DataTypes.INTEGER,
  },
  content_id: {
    type: DataTypes.INTEGER,
  },
  sentiment: {
    type: DataTypes.ENUM('positive', 'negative', 'neutral', 'mixed'),
  },
  sentiment_score: {
    type: DataTypes.FLOAT,
  },
  emotions: {
    type: DataTypes.JSON,
  },
  keywords: {
    type: DataTypes.JSON,
  },
  topics: {
    type: DataTypes.JSON,
  },
  analyzed_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Model associations
UserPersona.hasMany(AudienceContentAffinity, { foreignKey: 'persona_id' });
AudienceContentAffinity.belongsTo(UserPersona, { foreignKey: 'persona_id' });