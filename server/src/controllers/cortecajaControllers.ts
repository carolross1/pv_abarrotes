import { Request, Response } from 'express';
import pool from '../database';

export const registrarCorteInicial = async (req: Request, res: Response) => {
  const { id_Usuario, monto_Inicial, fecha } = req.body;

  try {
    await pool.query('INSERT INTO corte_caja (id_Usuario, monto_Inicial, fecha, tipo) VALUES (?, ?, ?, ?)', [id_Usuario, monto_Inicial, fecha, 'inicial']);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error al registrar el corte inicial:', error);
    res.status(500).json({ success: false, message: 'Error al registrar el corte inicial' });
  }
};

export const registrarCorteParcial = async (req: Request, res: Response) => {
  const { id_Usuario, monto_Final, fecha } = req.body;

  try {
    await pool.query('INSERT INTO corte_caja (id_Usuario, monto_Final, fecha, tipo) VALUES (?, ?, ?, ?)', [id_Usuario, monto_Final, fecha, 'parcial']);
    const montoCaja = await obtenerMontoEnCaja(id_Usuario, fecha);
    res.status(200).json({ success: true, montoCaja });
  } catch (error) {
    console.error('Error al registrar el corte parcial:', error);
    res.status(500).json({ success: false, message: 'Error al registrar el corte parcial' });
  }
};

export const registrarCorteFinal = async (req: Request, res: Response) => {
  const { id_Usuario, monto_Final, fecha } = req.body;

  try {
    await pool.query('INSERT INTO corte_caja (id_Usuario, monto_Final, fecha, tipo) VALUES (?, ?, ?, ?)', [id_Usuario, monto_Final, fecha, 'final']);
    const montoCaja = await obtenerMontoEnCaja(id_Usuario, fecha);
    res.status(200).json({ success: true, montoCaja });
  } catch (error) {
    console.error('Error al registrar el corte final:', error);
    res.status(500).json({ success: false, message: 'Error al registrar el corte final' });
  }
};

const obtenerMontoEnCaja = async (id_Usuario: string, fecha: string) => {
  try {
    const fechaInicio = new Date(fecha).toISOString().slice(0, 10);

    // Obtener el monto inicial del día
    const [corteInicial] = await pool.query(
      'SELECT monto_Inicial FROM corte_caja WHERE id_Usuario = ? AND tipo = ? AND DATE(fecha) = ? LIMIT 1',
      [id_Usuario, 'inicial', fechaInicio]
    );

    if (!corteInicial) {
      throw new Error('No se encontró el corte inicial para el día especificado');
    }

    const montoInicial = corteInicial.monto_Inicial;
    console.log('Monto Inicial:', montoInicial);

    // Obtener los cortes parciales del día
    const cortesParciales = await pool.query(
      'SELECT monto_Final FROM corte_caja WHERE id_Usuario = ? AND tipo = ? AND DATE(fecha) = ?',
      [id_Usuario, 'parcial', fechaInicio]
    );

    let montoParcialEntregado = 0;
    for (const corte of cortesParciales) {
      montoParcialEntregado += corte.monto_Final;
    }
    console.log('Monto Parcial Entregado:', montoParcialEntregado);

    // Obtener las ventas del usuario en la fecha especificada
    const ventas = await pool.query(
      'SELECT id_Venta FROM venta WHERE id_Usuario = ? AND DATE(fecha) = ?',
      [id_Usuario, fechaInicio]
    );

    let montoVentas = 0;
    const ventasMap = new Map();
    
    for (const venta of ventas) {
      const detalles = await pool.query(
        'SELECT total_venta, descuento FROM detalle_venta WHERE id_Venta = ?',
        [venta.id_Venta]
      );
      if (detalles.length > 0) {
        const ultimoDetalle = detalles[detalles.length - 1];
        ventasMap.set(venta.id_Venta, {
          total_venta: ultimoDetalle.total_venta,
          descuento: ultimoDetalle.descuento
        });
      }
    }
    for (const [id_Venta, { total_venta, descuento }] of ventasMap.entries()) {
      console.log('Total Venta:', total_venta, 'Descuento:', descuento);
      montoVentas += total_venta - (descuento || 0);
    }
    
    console.log('Monto Ventas:', montoVentas);

    // Calcular el monto esperado en caja
    const montoEsperado = montoInicial + montoVentas;
    console.log('Monto Esperado:', montoEsperado);

    // Calcular la diferencia
    const diferencia = montoEsperado - montoParcialEntregado;
    console.log('Diferencia:', diferencia);

    return {
      fecha: fechaInicio,
      total_Ventas: ventas.length,
      montoEsperado,
      montoParcialEntregado,
      diferencia
    };
  } catch (error) {
    console.error('Error al obtener el corte de caja:', error);
    throw new Error('Error al obtener el corte de caja');
  }
};
