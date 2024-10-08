"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
// Facebook App Credentials
const FACEBOOK_APP_ID = '910935567565163';
const FACEBOOK_APP_SECRET = '99997de41e2c41f398dc91ec9db4d2a2';
// Configurar estrategia de Passport con Facebook
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email'],
}, (accessToken, refreshToken, profile, done) => {
    var _a, _b;
    const user = { id: profile.id, name: profile.displayName, email: (_b = (_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value };
    // Generar un token JWT
    const token = jsonwebtoken_1.default.sign(user, 'your_jwt_secret_key', { expiresIn: '1h' });
    return done(null, { user, token });
}));
// Ruta para iniciar la autenticación con Facebook
router.get('/facebook', passport_1.default.authenticate('facebook', { scope: ['email'] }));
// Ruta de callback donde Facebook redirige tras la autenticación
router.get('/facebook/callback', passport_1.default.authenticate('facebook', { session: false }), // No usamos sesiones de servidor
(req, res) => {
    const { token } = req.user;
    // Redirigir al frontend con el token en la URL
    res.redirect(`http://localhost:4200/login-success?token=${token}`);
});
exports.default = router;
