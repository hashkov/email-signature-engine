import { Router } from 'express';
import { generateSignature } from '../controllers/signatureController';

const router = Router();

router.post('/generate', generateSignature);

export const signatureRoutes = router;
