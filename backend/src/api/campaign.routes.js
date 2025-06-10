import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all campaigns' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get campaign ${req.params.id}` });
});

router.get('/:id/performance', (req, res) => {
  res.json({ message: `Get campaign ${req.params.id} performance` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create campaign' });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update campaign ${req.params.id}` });
});

export default router;