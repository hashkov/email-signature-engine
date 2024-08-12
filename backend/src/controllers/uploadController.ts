import { Request, Response } from 'express';

export const uploadLogo = (req: Request, res: Response) => {
  if (req.file) {
    res.json({ url: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'No file uploaded' });
  }
};
