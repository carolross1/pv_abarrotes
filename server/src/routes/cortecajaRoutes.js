"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cortecajaControllers_1 = require("../controllers/cortecajaControllers");
var CortecajaRoutes = /** @class */ (function () {
    function CortecajaRoutes() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    CortecajaRoutes.prototype.config = function () {
        this.router.post('/corte-caja', cortecajaControllers_1.default.corteDeCaja);
    };
    return CortecajaRoutes;
}());
var cortecajaRoutes = new CortecajaRoutes();
exports.default = cortecajaRoutes.router;
