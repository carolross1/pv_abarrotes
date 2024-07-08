"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
class CorteCajaController {
    corteDeCaja(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_Usuario, id_Venta_Primero, id_Venta_Ultimo, fecha_Inicio } = req.body;
            // Obtener la fecha de término (fecha actual)
            const fecha_Termino = new Date();
            // Consulta para obtener el total de ventas entre el primer y último ticket
            const ventasQuery = `
            SELECT SUM(total) as total Ventas
            FROM Venta
            WHERE id_Usuario = ? AND id_Venta BETWEEN ? AND ?;
        `;
            const [ventasResult] = yield database_1.default.query(ventasQuery, [id_Usuario, id_Venta_Primero, id_Venta_Ultimo]);
            const total_Ventas = ventasResult[0].total_Ventas;
            const monto_Entregar = total_Ventas; // Corregir
            // Insertar en la tabla CorteCaja
            const insertQuery = `
            INSERT INTO Corte_Caja (id_Usuario, fecha_Inicio, fecha_Termino, total_Ventas, monto_Entregar)
            VALUES (?, ?, ?, ?, ?);
        `;
            yield database_1.default.query(insertQuery, [id_Usuario, fecha_Inicio, fecha_Termino, total_Ventas, monto_Entregar]);
            res.json({
                caja: 1,
                nombre: id_Usuario,
                total_Ventas,
                fecha_Inicio,
                fecha_Termino,
                monto_Entregar
            });
        });
    }
}
const corteCajaController = new CorteCajaController();
exports.default = corteCajaController;
