"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var morgan_1 = require("morgan");
var cors_1 = require("cors");
var cortecajaRoutes_1 = require("./routes/cortecajaRoutes");
var indexRoutes_1 = require("./routes/indexRoutes");
var productoRoutes_1 = require("./routes/productoRoutes");
var Server = /** @class */ (function () {
    function Server() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    //Métodos en TypeScrip
    Server.prototype.config = function () {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    };
    Server.prototype.routes = function () {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/cortecaja', cortecajaRoutes_1.default);
        this.app.use('/api/productos', productoRoutes_1.default);
    };
    Server.prototype.start = function () {
        var _this = this;
        this.app.listen(this.app.get('port'), function () {
            console.log('Server on port', _this.app.get('port'));
        });
    };
    return Server;
}());
var server = new Server();
server.start();
