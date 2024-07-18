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
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductos = void 0;
const database_1 = __importDefault(require("../../database"));
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield database_1.default.query('SELECT * FROM producto');
        res.json(productos);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error });
    }
});
exports.getProductos = getProductos;
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.query('INSERT INTO producto SET ?', [req.body]);
        res.json({ message: 'Producto creado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error });
    }
});
exports.createProducto = createProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield database_1.default.query('UPDATE producto SET ? WHERE id_Producto = ?', [req.body, id]);
        res.json({ message: 'Producto actualizado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error });
    }
});
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield database_1.default.query('DELETE FROM producto WHERE id_Producto = ?', [id]);
        res.json({ message: 'Producto eliminado' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error });
    }
});
exports.deleteProducto = deleteProducto;
