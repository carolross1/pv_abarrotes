import { Router } from 'express';
import { getCorteDeCaja } from '../controllers/cortecajaControllers';

const router = Router();

router.post('/corteCaja', getCorteDeCaja);

export default router;
