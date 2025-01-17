import express from 'express';
import validateJarat from '../middleware/validate-jarat.js';
import jaratLogger from '../middleware/jaratlogger.js';
import notLoggedIn from '../middleware/not-logged-in.js';
import rejectNotAdmin from '../middleware/reject-not-admin.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('felvezetes', {
    username: req.session.username,
    roleID: req.session.roleID,
  });
});

router.post(
  '/',
  express.urlencoded({ extended: true }),
  notLoggedIn, // bejelentkezes szukseges
  rejectNotAdmin, // csak admin adhat hozza jaratot
  validateJarat, // jarat validalasa
  jaratLogger, // jarat beszurasa az adatbazisba
  (req, res) => {
    res.redirect('/');
  },
);

export default router;
