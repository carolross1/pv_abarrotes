import { Request, Response } from 'express';
import pool from '../database';

export const getFacturas = async (req: Request, res: Response): Promise<void> => {
    try {
        const facturas = await pool.query('SELECT * FROM factura');
        res.json(facturas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener facturas', error });
    }
};

export const createFactura = async (req: Request, res: Response): Promise<void> => {
    try {
        await pool.query('INSERT INTO factura SET ?', [req.body]);
        res.json({ message: 'Factura creada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear factura', error });
    }
};

export const updateFactura = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.query('UPDATE factura SET ? WHERE id_Factura = ?', [req.body, id]);
        res.json({ message: 'Factura actualizada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar factura', error });
    }
};

export const deleteFactura = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM factura WHERE id_Factura = ?', [id]);
        res.json({ message: 'Factura eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar factura', error });
    }
};
