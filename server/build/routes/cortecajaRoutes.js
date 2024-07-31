"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cortecajaControllers_1 = require("../controllers/cortecajaControllers");
const router = (0, express_1.Router)();
router.post('/corteCaja', cortecajaControllers_1.getCorteDeCaja);
exports.default = router;
