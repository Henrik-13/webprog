import express from 'express';
import validateRegister from '../middleware/validate-register.js';
import register from '../middleware/register.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', express.urlencoded({ extended: true }), validateRegister, register, (req, res) => {
  res.redirect('/');
});

export default router;
