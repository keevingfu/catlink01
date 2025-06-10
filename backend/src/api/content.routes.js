import express from 'express';
import { ContentController } from '../controllers/content.controller.js';

const router = express.Router();
const controller = new ContentController();

// Content Performance Analysis
router.get('/performance', controller.getContentPerformance);
router.get('/performance/trends', controller.getPerformanceTrends);
router.get('/performance/comparison', controller.getPlatformComparison);

// Content ROI Analysis
router.get('/roi', controller.getContentROI);
router.get('/roi/products', controller.getProductContentROI);

// Creative Elements Analysis
router.get('/creative-elements', controller.getCreativeElements);
router.get('/creative-elements/viral', controller.getViralElements);

// Content Details
router.get('/', controller.getAllContent);
router.get('/:id', controller.getContentById);
router.get('/:id/performance-history', controller.getContentPerformanceHistory);

// Video Preview
router.get('/:id/preview', controller.getVideoPreview);

export default router;