import express from 'express';
import { findFoglalasByFelhasznalo, findFoglalasByJaratID } from '../db/foglalasok.js';
import jaratFoglalas from '../middleware/foglalaslogger.js';
import validateFoglalas from '../middleware/validate-foglalas.js';
import notLoggedIn from '../middleware/not-logged-in.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    let foglalasok;
    if (req.session.roleID === 1) {
      [foglalasok] = await findFoglalasByJaratID(req.params.id);
    } else {
      [foglalasok] = await findFoglalasByFelhasznalo(req.params.id, req.session.username);
    }
    const jaratID = req.params.id;
    const { message } = req.query;
    res.render('foglalasok', {
      foglalasok,
      jaratID,
      message,
      /* userID: req.session.userID, */
      username: req.session.username,
      roleID: req.session.roleID,
    });
  } catch (err) {
    res.status(500).render('error', { title: '500', message: `Selection unsuccessful: ${err.message}` });
  }
});

router.post(
  '/:id',
  express.urlencoded({ extended: true }),
  notLoggedIn,
  validateFoglalas,
  jaratFoglalas,
  (req, res) => {
    try {
      res.redirect(`/foglalas/${req.params.id}?message=Foglalás sikeres`);
    } catch (err) {
      res.redirect(`/foglalas/${req.params.id}?message=Hiba történt a foglalás során`);
    }
  },
);

export default router;
