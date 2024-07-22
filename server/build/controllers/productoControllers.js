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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
class ProductoController {


    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield database_1.default.query('SELECT * FROM producto');
            res.json(productos);
        });
    }

    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const productos = yield database_1.default.query('SELECT * FROM producto WHERE id_Producto = ?', [id]);
            if (productos.length > 0) {
                res.json(productos[0]);
            }
            else {
                res.status(404).json({ text: 'El producto no existe' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO producto set ?', [req.body]);
            res.json({ message: 'Producto Guardado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE producto set ? WHERE id_Producto = ?', [req.body, id]);
            res.json({ message: 'El producto fue actualizado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM producto WHERE id_Producto = ?', [id]);
            res.json({ message: 'El producto fue eliminado' });
        });
 
    }
    getProductosBajoStock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            
            const productos = yield database_1.default.query('SELECT * FROM producto WHERE cantidad_Stock < cant_Minima');
            if (productos.length > 0) {
                res.json(productos);
            } else {
                res.status(404).json({ text: 'No hay productos con bajo stock' });
            }
        });
    }
    
}



const productoController = new ProductoController();
exports.default = productoController;
