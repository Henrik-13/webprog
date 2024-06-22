import express from 'express';
import validateLogin from '../middleware/validate-login.js';
import setSession from '../middleware/set-session.js';
import alreadyLoggedIn from '../middleware/already-logged-in.js';

const router = express.Router();

// ha mar be van jelentkezve, akkor ne engedje ujra
router.use('/', alreadyLoggedIn);

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', express.urlencoded({ extended: true }), validateLogin, setSession, (req, res) => {
  res.redirect('/');
});

export default router;
