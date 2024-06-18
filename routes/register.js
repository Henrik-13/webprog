import express from 'express';
import validateRegister from '../middleware/validate-register.js';
import register from '../middleware/register.js';
import setSession from '../middleware/set-session.js';
import alreadyLoggedIn from '../middleware/already-logged-in.js';

const router = express.Router();

router.use('/', alreadyLoggedIn);

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', express.urlencoded({ extended: true }), validateRegister, register, setSession, (req, res) => {
  res.redirect('/');
});

export default router;
