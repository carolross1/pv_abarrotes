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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductosBajoStock = exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductos = void 0;
var database_1 = require("../../database");
var getProductos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productos, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database_1.default.query('SELECT * FROM producto')];
            case 1:
                productos = _a.sent();
                res.json(productos);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                res.status(500).json({ message: 'Error al obtener productos', error: error_1 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getProductos = getProductos;
var createProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database_1.default.query('INSERT INTO producto SET ?', [req.body])];
            case 1:
                _a.sent();
                res.json({ message: 'Producto creado' });
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ message: 'Error al crear producto', error: error_2 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.createProducto = createProducto;
var updateProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, database_1.default.query('UPDATE producto SET ? WHERE id_Producto = ?', [req.body, id])];
            case 2:
                _a.sent();
                res.json({ message: 'Producto actualizado' });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(500).json({ message: 'Error al actualizar producto', error: error_3 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateProducto = updateProducto;
var deleteProducto = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, database_1.default.query('DELETE FROM producto WHERE id_Producto = ?', [id])];
            case 2:
                _a.sent();
                res.json({ message: 'Producto eliminado' });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(500).json({ message: 'Error al eliminar producto', error: error_4 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteProducto = deleteProducto;
var getProductosBajoStock = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productos, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, database_1.default.query('SELECT * FROM producto WHERE cantidad_Stock < cant_Minima')];
            case 1:
                productos = _a.sent();
                console.log('Productos bajo stock:', productos);
                if (productos.length === 0) {
                    res.status(404).json({ text: 'No hay productos con bajo stock' });
                }
                else {
                    res.json(productos);
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Error al obtener productos bajo stock:', error_5);
                res.status(500).json({ message: 'Error al obtener productos bajo stock', error: error_5 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };

exports.getProductosBajoStock = getProductosBajoStock;
