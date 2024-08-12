import { Router } from 'express';
import { uploadLogo } from '../controllers/uploadController';
import upload from '../middlewares/upload';

const router = Router();

router.post('/', upload.single('logo'), uploadLogo);

export const uploadRoutes = router;
