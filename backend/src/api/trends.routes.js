import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get trends' });
});

router.get('/keywords', (req, res) => {
  res.json({ message: 'Get keywords' });
});

router.get('/predictions', (req, res) => {
  res.json({ message: 'Get predictions' });
});

export default router;