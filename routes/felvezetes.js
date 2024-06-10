import express from 'express';
import validateJarat from '../middleware/validate-jarat.js';
import jaratLogger from '../middleware/jaratlogger.js';
import notLoggedIn from '../middleware/not-logged-in.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('felvezetes', { userID: req.session.userID, username: req.session.username });
});

router.post('/', express.urlencoded({ extended: true }), notLoggedIn, validateJarat, jaratLogger, (req, res) => {
  res.redirect('/');
});

export default router;
