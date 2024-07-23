"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoControllers_1 = require("../controllers/productoControllers");

class ProductoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/bajo-stock', productoControllers_1.default.getProductosBajoStock);
        this.router.get('/', productoControllers_1.default.list);
        this.router.get('/:id', productoControllers_1.default.getOne);
        this.router.post('/', productoControllers_1.default.create);
        this.router.put('/:id', productoControllers_1.default.update);
        this.router.delete('/:id', productoControllers_1.default.delete);
        this.router.put('/actualizar-stock/:id', productoControllers_1.default.updateStock);
       
    }
}
const productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
