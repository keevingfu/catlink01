import express from 'express';

const router = express.Router();

router.get('/kpis', (req, res) => {
  res.json({ message: 'Get KPIs' });
});

router.get('/insights', (req, res) => {
  res.json({ message: 'Get insights' });
});

router.get('/alerts', (req, res) => {
  res.json({ message: 'Get alerts' });
});

router.get('/recommendations', (req, res) => {
  res.json({ message: 'Get recommendations' });
});

export default router;