"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cortecajaControllers_1 = require("../controllers/cortecajaControllers");
const router = (0, express_1.Router)();
router.post('/corte-inicial', cortecajaControllers_1.registrarCorteInicial);
router.post('/corte-parcial', cortecajaControllers_1.registrarCorteParcial);
router.post('/corte-final', cortecajaControllers_1.registrarCorteFinal);
exports.default = router;
