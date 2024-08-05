import { Router } from 'express';
import {registrarCorteInicial,registrarCorteParcial,registrarCorteFinal} from '../controllers/cortecajaControllers';

const router = Router();


router.post('/corte-inicial',registrarCorteInicial);
router.post('/corte-parcial', registrarCorteParcial);
router.post('/corte-final', registrarCorteFinal);



export default router;
