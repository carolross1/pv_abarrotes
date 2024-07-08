"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cortecajaControllers_1 = __importDefault(require("../controllers/cortecajaControllers"));
class CortecajaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/corte-caja', cortecajaControllers_1.default.corteDeCaja);
    }
}
const cortecajaRoutes = new CortecajaRoutes();
exports.default = cortecajaRoutes.router;
