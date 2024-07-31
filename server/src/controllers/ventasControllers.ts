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
      const id_Venta = ventaResult[0].id_Venta;
      console.log('ID de la venta recuperado:', id_Venta);
      res.json({ id_Venta });
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
  const { id_Venta, id_Producto, cantidad, descuento} = req.body;

// Imprimir el contenido de `detalles` en la consola
console.log('Detalles recibidos:', { id_Venta, id_Producto, cantidad, descuento});

try {
  // Insertar la venta
  const result: any = await pool.query(
    'INSERT INTO detalle_venta (id_Venta, id_Producto, descuento, cantidad) VALUES (?, ?, ?, ?)',
    [id_Venta, id_Producto, cantidad, descuento]
  );

} catch (error) {
  console.error('Error al crear la venta:', error);
  res.status(500).json({ message: 'Error al crear el detalle de  venta' });
}
};