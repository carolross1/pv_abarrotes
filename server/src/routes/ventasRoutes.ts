import { Router } from 'express';
import { createVenta,registrarDetallesVenta} from '../controllers/ventasControllers';

const router = Router();

router.post('/create', createVenta);
router.post('/detalle/create', registrarDetallesVenta);

export default router;
