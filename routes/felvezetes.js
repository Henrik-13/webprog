import express from 'express';
import validateJarat from '../middleware/validate-jarat.js';
import jaratLogger from '../middleware/jaratlogger.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('felvezetes');
});

router.post('/', express.urlencoded({ extended: true }), validateJarat, jaratLogger, (req, res) => {
  res.redirect('/');
});

export default router;
