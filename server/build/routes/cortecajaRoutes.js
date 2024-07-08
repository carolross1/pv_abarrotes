"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class CortecajaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, resp) => resp.send("Caja"));
    }
}
const cortecajaRoutes = new CortecajaRoutes();
exports.default = cortecajaRoutes.router;
