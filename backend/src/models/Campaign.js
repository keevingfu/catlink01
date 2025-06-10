import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const AdCampaign = sequelize.define('AdCampaign', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  campaign_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  campaign_type: {
    type: DataTypes.STRING,
  },
  objective: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'paused', 'completed', 'archived'),
    defaultValue: 'draft',
  },
  budget: {
    type: DataTypes.DECIMAL(10, 2),
  },
  spent: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'USD',
  },
  start_date: {
    type: DataTypes.DATE,
  },
  end_date: {
    type: DataTypes.DATE,
  },
  target_metrics: {
    type: DataTypes.JSON,
  },
});

export const AdContent = sequelize.define('AdContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  campaign_id: {
    type: DataTypes.INTEGER,
    references: {
      model: AdCampaign,
      key: 'id',
    },
  },
  ad_name: {
    type: DataTypes.STRING,
  },
  ad_type: {
    type: DataTypes.STRING,
  },
  creative_url: {
    type: DataTypes.STRING,
  },
  headline: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  call_to_action: {
    type: DataTypes.STRING,
  },
  landing_page_url: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('active', 'paused', 'archived'),
    defaultValue: 'active',
  },
});

export const AdPerformance = sequelize.define('AdPerformance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ad_content_id: {
    type: DataTypes.INTEGER,
    references: {
      model: AdContent,
      key: 'id',
    },
  },
  campaign_id: {
    type: DataTypes.INTEGER,
    references: {
      model: AdCampaign,
      key: 'id',
    },
  },
  platform: {
    type: DataTypes.STRING,
  },
  impressions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  conversions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  spend: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  revenue: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0,
  },
  click_through_rate: {
    type: DataTypes.FLOAT,
  },
  conversion_rate: {
    type: DataTypes.FLOAT,
  },
  cost_per_click: {
    type: DataTypes.DECIMAL(10, 2),
  },
  cost_per_conversion: {
    type: DataTypes.DECIMAL(10, 2),
  },
  return_on_ad_spend: {
    type: DataTypes.FLOAT,
  },
  data_date: {
    type: DataTypes.DATE,
  },
});

// Model associations
AdCampaign.hasMany(AdContent, { foreignKey: 'campaign_id' });
AdContent.belongsTo(AdCampaign, { foreignKey: 'campaign_id' });

AdContent.hasMany(AdPerformance, { foreignKey: 'ad_content_id' });
AdPerformance.belongsTo(AdContent, { foreignKey: 'ad_content_id' });

AdCampaign.hasMany(AdPerformance, { foreignKey: 'campaign_id' });
AdPerformance.belongsTo(AdCampaign, { foreignKey: 'campaign_id' });