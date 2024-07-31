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
exports.deleteFactura = exports.updateFactura = exports.createFactura = exports.getFacturas = void 0;
const database_1 = __importDefault(require("../database"));
const getFacturas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facturas = yield database_1.default.query('SELECT * FROM factura');
        res.json(facturas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener facturas', error });
    }
});
exports.getFacturas = getFacturas;
const createFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query('INSERT INTO factura SET ?', [req.body]);
        res.json({ message: 'Factura creada' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear factura', error });
    }
});
exports.createFactura = createFactura;
const updateFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield database_1.default.query('UPDATE factura SET ? WHERE id_Factura = ?', [req.body, id]);
        res.json({ message: 'Factura actualizada' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar factura', error });
    }
});
exports.updateFactura = updateFactura;
const deleteFactura = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield database_1.default.query('DELETE FROM factura WHERE id_Factura = ?', [id]);
        res.json({ message: 'Factura eliminada' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar factura', error });
    }
});
exports.deleteFactura = deleteFactura;
