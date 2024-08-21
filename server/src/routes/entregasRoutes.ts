import { Router } from 'express';
import { crearEntrega, registrarDetallesEntrega, obtenerEntregas, obtenerEntregaPorId, eliminarEntrega, actualizarStock } from '../controllers/entregasControllers';

const router = Router();

// Ruta para crear una nueva entrega
router.post('/create', crearEntrega);

// Ruta para registrar detalles de la entrega
router.post('/detalle/create', registrarDetallesEntrega);

// Ruta para obtener todas las entregas
router.get('/', obtenerEntregas);

// Ruta para obtener una entrega por ID
router.get('/:idEntrega', obtenerEntregaPorId);

// Ruta para eliminar una entrega por ID
router.delete('/delete/:idEntrega', eliminarEntrega);

// Ruta para actualizar el stock de un producto
router.patch('/producto/update-stock', actualizarStock);

export default router;
