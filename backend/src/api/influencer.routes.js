import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all influencers' });
});

router.get('/self-koc', (req, res) => {
  res.json({ message: 'Get self KOC data' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get influencer ${req.params.id}` });
});

export default router;