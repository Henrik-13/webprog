import express from 'express';
import { findFoglalasByFelhasznaloAndJarat, findFoglalasByJaratID } from '../db/foglalasok.js';
import jaratFoglalas from '../middleware/foglalaslogger.js';
import validateFoglalas from '../middleware/validate-foglalas.js';
import notLoggedIn from '../middleware/not-logged-in.js';
import { findJaratByID } from '../db/jaratok.js';

const router = express.Router();

function getKezdDatum(nap) {
  const napok = {
    Vasarnap: 0,
    Hetfo: 1,
    Kedd: 2,
    Szerda: 3,
    Csutortok: 4,
    Pentek: 5,
    Szombat: 6,
  };
  const date = new Date();
  const today = date.getUTCDay();
  const kezdNap = napok[nap];
  const hatralevoNapok = (kezdNap + 7 - today) % 7 || 7;
  const kezdDatum = new Date(date);
  kezdDatum.setUTCDate(date.getUTCDate() + hatralevoNapok);

  return kezdDatum.toISOString().split('T')[0];
}

router.get('/:id', async (req, res) => {
  try {
    let foglalasok;
    if (req.session.roleID === 1) {
      [foglalasok] = await findFoglalasByJaratID(req.params.id);
    } else {
      [foglalasok] = await findFoglalasByFelhasznaloAndJarat(req.params.id, req.session.username);
    }
    const jaratID = req.params.id;
    const { message } = req.query;

    const [[jarat]] = await findJaratByID(jaratID);
    const kezdDatum = getKezdDatum(jarat.Nap);
    res.render('foglalasok', {
      foglalasok,
      jarat,
      kezdDatum,
      message,
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
