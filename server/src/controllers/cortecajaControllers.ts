import { Request, Response } from 'express';
import pool from '../../database';

class CorteCajaController {
    public async corteDeCaja(req: Request, res: Response): Promise<void> {
        const { id_Usuario, id_Venta_Primero, id_Venta_Ultimo, fecha_Inicio } = req.body;

        // Obtener la fecha de término (fecha actual)
        const fecha_Termino = new Date();

        // Consulta para obtener el total de ventas entre el primer y último ticket
        const ventasQuery = `
            SELECT SUM(total) as total Ventas
            FROM Venta
            WHERE id_Usuario = ? AND id_Venta BETWEEN ? AND ?;
        `;
        
        const [ventasResult] = await pool.query(ventasQuery, [id_Usuario, id_Venta_Primero, id_Venta_Ultimo]);
        const total_Ventas = ventasResult[0].total_Ventas;

        
        const monto_Entregar = total_Ventas;  // Corregir

        // Insertar en la tabla CorteCaja
        const insertQuery = `
            INSERT INTO Corte_Caja (id_Usuario, fecha_Inicio, fecha_Termino, total_Ventas, monto_Entregar)
            VALUES (?, ?, ?, ?, ?);
        `;
        await pool.query(insertQuery, [id_Usuario, fecha_Inicio, fecha_Termino, total_Ventas, monto_Entregar]);

        res.json({
            caja: 1, 
            nombre: id_Usuario,  
            total_Ventas,
            fecha_Inicio,
            fecha_Termino,
            monto_Entregar
        });
    }
}

const corteCajaController = new CorteCajaController();
export default corteCajaController;