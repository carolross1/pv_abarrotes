import { Request, Response } from 'express';
import pool from '../database';

export const getCorteDeCaja = async (req: Request, res: Response) => {
  const { id_Usuario, fecha } = req.body;

  try {
    // Convertir la fecha a formato YYYY-MM-DD
    const fechaInicio = new Date(fecha).toISOString().slice(0, 10);

    // Obtener las ventas del usuario en la fecha especificada, considerando solo la fecha
    const ventas = await pool.query(
      'SELECT id_Venta FROM venta WHERE id_Usuario = ? AND DATE(fecha) = ?',
      [id_Usuario, fechaInicio]
    );

    // Calcular total_Ventas y monto_Entregar
    let total_Ventas = ventas.length;
    let monto_Entregar = 0;

    for (const venta of ventas) {
      const detalles = await pool.query(
        'SELECT cantidad, descuento FROM detalle_venta WHERE id_Venta = ?',
        [venta.id_Venta]
      );

      for (const detalle of detalles) {
        monto_Entregar += (detalle.cantidad) - (detalle.descuento || 0);
      }
    }

    res.status(200).json({ fecha: fechaInicio, total_Ventas, monto_Entregar });
  } catch (error) {
    console.error('Error al obtener el corte de caja:', error);
    res.status(500).json({ message: 'Error al obtener el corte de caja' });
  }
};
