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
exports.registrarCorteFinal = exports.registrarCorteParcial = exports.registrarCorteInicial = void 0;
const database_1 = __importDefault(require("../database"));
const registrarCorteInicial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_Usuario, monto_Inicial, fecha } = req.body;
    try {
        yield database_1.default.query('INSERT INTO corte_caja (id_Usuario, monto_Inicial, fecha, tipo) VALUES (?, ?, ?, ?)', [id_Usuario, monto_Inicial, fecha, 'inicial']);
        res.status(200).json({ success: true });
    }
    catch (error) {
        console.error('Error al registrar el corte inicial:', error);
        res.status(500).json({ success: false, message: 'Error al registrar el corte inicial' });
    }
});
exports.registrarCorteInicial = registrarCorteInicial;
const registrarCorteParcial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_Usuario, monto_Final, fecha } = req.body;
    try {
        yield database_1.default.query('INSERT INTO corte_caja (id_Usuario, monto_Final, fecha, tipo) VALUES (?, ?, ?, ?)', [id_Usuario, monto_Final, fecha, 'parcial']);
        const montoCaja = yield obtenerMontoEnCaja(id_Usuario, fecha);
        res.status(200).json({ success: true, montoCaja });
    }
    catch (error) {
        console.error('Error al registrar el corte parcial:', error);
        res.status(500).json({ success: false, message: 'Error al registrar el corte parcial' });
    }
});
exports.registrarCorteParcial = registrarCorteParcial;
const registrarCorteFinal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_Usuario, monto_Final, fecha } = req.body;
    try {
        yield database_1.default.query('INSERT INTO corte_caja (id_Usuario, monto_Final, fecha, tipo) VALUES (?, ?, ?, ?)', [id_Usuario, monto_Final, fecha, 'final']);
        const montoCaja = yield obtenerMontoEnCaja(id_Usuario, fecha);
        res.status(200).json({ success: true, montoCaja });
    }
    catch (error) {
        console.error('Error al registrar el corte final:', error);
        res.status(500).json({ success: false, message: 'Error al registrar el corte final' });
    }
});
exports.registrarCorteFinal = registrarCorteFinal;
const obtenerMontoEnCaja = (id_Usuario, fecha) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fechaInicio = new Date(fecha).toISOString().slice(0, 10);
        // Obtener el monto inicial del día
        const [corteInicial] = yield database_1.default.query('SELECT monto_Inicial FROM corte_caja WHERE id_Usuario = ? AND tipo = ? AND DATE(fecha) = ? LIMIT 1', [id_Usuario, 'inicial', fechaInicio]);
        if (!corteInicial) {
            throw new Error('No se encontró el corte inicial para el día especificado');
        }
        const montoInicial = corteInicial.monto_Inicial;
        console.log('Monto Inicial:', montoInicial);
        // Obtener los cortes parciales del día
        const cortesParciales = yield database_1.default.query('SELECT monto_Final FROM corte_caja WHERE id_Usuario = ? AND tipo = ? AND DATE(fecha) = ?', [id_Usuario, 'parcial', fechaInicio]);
        let montoParcialEntregado = 0;
        for (const corte of cortesParciales) {
            montoParcialEntregado += corte.monto_Final;
        }
        console.log('Monto Parcial Entregado:', montoParcialEntregado);
        // Obtener las ventas del usuario en la fecha especificada
        const ventas = yield database_1.default.query('SELECT id_Venta FROM venta WHERE id_Usuario = ? AND DATE(fecha) = ?', [id_Usuario, fechaInicio]);
        let montoVentas = 0;
        const ventasMap = new Map();
        for (const venta of ventas) {
            const detalles = yield database_1.default.query('SELECT total_venta, descuento FROM detalle_venta WHERE id_Venta = ?', [venta.id_Venta]);
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
    }
    catch (error) {
        console.error('Error al obtener el corte de caja:', error);
        throw new Error('Error al obtener el corte de caja');
    }
});
