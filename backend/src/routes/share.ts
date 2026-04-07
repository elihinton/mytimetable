import { Router, type IRouter } from 'express';
import { addShareLink, lookupShareLink } from '../controllers/share.js';

const router: IRouter = Router();

// creates a share link
router.post('/create', async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ message: 'No data was provided' });
  }
  const result = await addShareLink(data);
  res.json(result);
});

// finds share link via code
router.get('/find/:code', async (req, res) => {
  const { code } = req.params;
  const result = await lookupShareLink(code, false);
  if (result.found) {
    res.json({ found: true, data: result.data });
  } else {
    res.status(404).json({ found: false });
  }
});

export default router;
