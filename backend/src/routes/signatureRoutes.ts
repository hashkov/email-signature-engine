import { Router } from 'express';
import {
  generateSignature,
  getTemplates,
} from '../controllers/signatureController';

const router = Router();

router.post('/generate', generateSignature);
router.get('/templates', getTemplates);

export const signatureRoutes = router;
