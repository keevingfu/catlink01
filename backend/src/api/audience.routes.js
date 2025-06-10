import express from 'express';

const router = express.Router();

router.get('/personas', (req, res) => {
  res.json({ message: 'Get all personas' });
});

router.get('/personas/:id', (req, res) => {
  res.json({ message: `Get persona ${req.params.id}` });
});

router.get('/content-affinity', (req, res) => {
  res.json({ message: 'Get content affinity data' });
});

router.get('/sentiment', (req, res) => {
  res.json({ message: 'Get sentiment analysis' });
});

router.get('/comment-topics', (req, res) => {
  res.json({ message: 'Get comment topics' });
});

export default router;