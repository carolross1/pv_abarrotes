import { Router } from 'express';
import { getProductos, createProducto, updateProducto, deleteProducto,updateStock} from '../controllers/productoControllers';
import { getProductosBajoStock} from '../controllers/productoControllers';

const router = Router();

router.get('/bajo-stock', getProductosBajoStock); 
router.get('/', getProductos);  
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);
router.put('/actualizar-stock/:id', updateStock);

export default router;
