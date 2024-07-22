"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
var IndexController = /** @class */ (function () {
    function IndexController() {
    }
    IndexController.prototype.index = function (req, resp) {
        resp.send('Ya responde!!!');
    };
    return IndexController;
}());
exports.indexController = new IndexController();
