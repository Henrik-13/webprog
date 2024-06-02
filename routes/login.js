import express from 'express';
import validateLogin from '../middleware/validate-login.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', express.urlencoded({ extended: true }), validateLogin, (req, res) => {
  res.redirect('/');
});

export default router;
