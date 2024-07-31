"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventasControllers_1 = require("../controllers/ventasControllers");
const router = (0, express_1.Router)();
router.post('/create', ventasControllers_1.createVenta);
router.post('/detalle/create', ventasControllers_1.registrarDetallesVenta);
exports.default = router;
