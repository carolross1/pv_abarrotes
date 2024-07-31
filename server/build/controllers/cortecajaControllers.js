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
exports.getCorteDeCaja = void 0;
const database_1 = __importDefault(require("../database"));
const getCorteDeCaja = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_Usuario, fecha } = req.body;
    try {
        // Convertir la fecha a formato YYYY-MM-DD
        const fechaInicio = new Date(fecha).toISOString().slice(0, 10);
        // Obtener las ventas del usuario en la fecha especificada, considerando solo la fecha
        const ventas = yield database_1.default.query('SELECT id_Venta FROM venta WHERE id_Usuario = ? AND DATE(fecha) = ?', [id_Usuario, fechaInicio]);
        // Calcular total_Ventas y monto_Entregar
        let total_Ventas = ventas.length;
        let monto_Entregar = 0;
        for (const venta of ventas) {
            const detalles = yield database_1.default.query('SELECT cantidad, descuento FROM detalle_venta WHERE id_Venta = ?', [venta.id_Venta]);
            for (const detalle of detalles) {
                monto_Entregar += (detalle.cantidad) - (detalle.descuento || 0);
            }
        }
        res.status(200).json({ fecha: fechaInicio, total_Ventas, monto_Entregar });
    }
    catch (error) {
        console.error('Error al obtener el corte de caja:', error);
        res.status(500).json({ message: 'Error al obtener el corte de caja' });
    }
});
exports.getCorteDeCaja = getCorteDeCaja;
