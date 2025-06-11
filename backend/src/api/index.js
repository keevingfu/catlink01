import express from 'express';
import authRoutes from './auth.routes.js';
import contentRoutes from './content.routes.js';
import audienceRoutes from './audience.routes.js';
import campaignRoutes from './campaign.routes.js';
import trendsRoutes from './trends.routes.js';
import influencerRoutes from './influencer.routes.js';
import analyticsRoutes from './analytics.routes.js';
import dashboardRoutes from './dashboard.routes.js';

const router = express.Router();

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// API Routes
router.use('/auth', authRoutes);
router.use('/content', contentRoutes);
router.use('/audience', audienceRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/trends', trendsRoutes);
router.use('/influencers', influencerRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;