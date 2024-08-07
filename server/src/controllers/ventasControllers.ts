import { Request, Response } from 'express';
import pool from '../database';
import { idText } from 'typescript';

export const createVenta = async (req: Request, res: Response) => {
  const { id_Usuario, fecha, metodo_Pago, caja } = req.body;

  try {
    // Insertar la venta
    const result: any = await pool.query(
      'INSERT INTO venta (id_Usuario, fecha, metodo_Pago, caja) VALUES (?, ?, ?, ?)',
      [id_Usuario, fecha, metodo_Pago, caja]
    );

    const lastId = result.insertId;
    console.log('ID autoincrementado insertado:', lastId);

    // Obtener id_Venta usando el id autoincrementado
    const ventaResult: any = await pool.query('SELECT id_Venta FROM venta WHERE id = ?', [lastId]);

    console.log('Resultado de la consulta de recuperación:', ventaResult);

    if (Array.isArray(ventaResult) && ventaResult.length > 0) {
      const idVenta = ventaResult[0].id_Venta;
      console.log('ID de la venta recuperado:', idVenta);
      res.json({ idVenta });
    } else {
      console.error('No se encontró el id_Venta para el id:', lastId);
      res.status(500).json({ message: 'No se pudo recuperar el ID de la venta.' });
    }
  } catch (error) {
    console.error('Error al crear la venta:', error);
    res.status(500).json({ message: 'Error al crear la venta' });
  }
};

export const registrarDetallesVenta = async (req: Request, res: Response) => {
  const detalles = req.body; // Asume que `req.body` es un array de detalles de venta
  //const detalles= DetalleVenta[]
console.log('ARRAYS:',detalles);

  try {
    // Usa una transacción para insertar múltiples detalles
    await pool.query('START TRANSACTION'); // Iniciar transacción

    for (const detalle of detalles) {
    
      const { id_Venta, id_Producto, descuento, cantidad, total_venta } = detalle;
      console.log('Insertando detalle:', id_Venta, id_Producto, descuento, cantidad, total_venta);
      await pool.query(
        'INSERT INTO detalle_venta (id_Venta, id_Producto, descuento, cantidad, total_venta) VALUES (?, ?, ?, ?, ?)',
        [id_Venta, id_Producto, descuento, cantidad, total_venta]
      );
      
    }
    await pool.query('COMMIT'); // Confirmar transacción
    res.status(200).json({ success: true, message: 'Detalles de venta registrados con éxito' });
  } catch (error) {
    await pool.query('ROLLBACK'); // Revertir transacción en caso de error
    console.error('Error al registrar detalles de venta:', error);
    res.status(500).json({ message: 'Error al registrar los detalles de venta' });
  }
};
