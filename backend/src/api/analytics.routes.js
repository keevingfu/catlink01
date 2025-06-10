import express from 'express';

const router = express.Router();

router.get('/content-features', (req, res) => {
  res.json({ message: 'Get content features' });
});

router.get('/content-clusters', (req, res) => {
  res.json({ message: 'Get content clusters' });
});

router.get('/video/:id', (req, res) => {
  res.json({ message: `Get video analysis for ${req.params.id}` });
});

router.get('/cross-platform', (req, res) => {
  res.json({ message: 'Get cross-platform analysis' });
});

export default router;