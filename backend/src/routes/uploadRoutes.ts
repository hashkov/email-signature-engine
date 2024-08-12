import { Router } from 'express';
import upload from '../middlewares/upload';

const router = Router();

router.post('/', upload.single('logo'), (req, res) => {
  if (req.file) {
    res.json({ url: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
});

export const uploadRoutes = router;
