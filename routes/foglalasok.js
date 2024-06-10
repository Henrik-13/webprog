import express from 'express';
import { findFoglalasByID } from '../db/foglalasok.js';
import jaratFoglalas from '../middleware/foglalaslogger.js';
import validateFoglalas from '../middleware/validate-foglalas.js';
import notLoggedIn from '../middleware/not-logged-in.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    const [foglalasok] = await findFoglalasByID(req.params.id);
    const jaratID = req.params.id;
    // const [felhasznalok] = await findAllFelhasznalok();
    const { message } = req.query;
    res.render('foglalasok', {
      foglalasok,
      // felhasznalok,
      jaratID,
      message,
      userID: req.session.userID,
      username: req.session.username,
    });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
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
