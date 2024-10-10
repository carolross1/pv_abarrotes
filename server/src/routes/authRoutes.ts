import { Router } from 'express';
import passport from 'passport';
import { Strategy as FacebookStrategy, Profile } from 'passport-facebook';
import jwt from 'jsonwebtoken';

const router = Router();

// Facebook App Credentials
const FACEBOOK_APP_ID = '910935567565163';
const FACEBOOK_APP_SECRET = '99997de41e2c41f398dc91ec9db4d2a2';

// Configurar estrategia de Passport con Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email'],
    },
    (accessToken: string, refreshToken: string, profile: Profile, done) => {
      const user = { id: profile.id, name: profile.displayName, email: profile.emails?.[0]?.value };

      // Generar un token JWT
      const token = jwt.sign(user, 'your_jwt_secret_key', { expiresIn: '1h' });

      return done(null, { user, token });
    }
  )
);

// Ruta para iniciar la autenticación con Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

// Ruta de callback donde Facebook redirige tras la autenticación
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false }), // No usamos sesiones de servidor
  (req, res) => {
    const { token } = req.user as { token: string };

    // Redirigir al frontend con el token en la URL
    res.redirect(`http://localhost:4200/login-success?token=${token}`);
  }
);

export default router;
