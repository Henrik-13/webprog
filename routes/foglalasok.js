import express from 'express';
import { findFoglalasByID } from '../db/foglalasok.js';
import { findAllFelhasznalok } from '../db/felhasznalok.js';
import jaratFoglalas from '../middleware/foglalaslogger.js';
import validateFoglalas from '../middleware/validate-foglalas.js';

const router = express.Router();

router.get('/:id', async (req, res) => {
  try {
    // const [foglalasok] = await findAllFoglalasok();
    const [foglalasok] = await findFoglalasByID(req.params.id);
    const jaratID = req.params.id;
    const [felhasznalok] = await findAllFelhasznalok();
    res.render('foglalasok', { foglalasok, felhasznalok, jaratID });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

router.post('/:id', express.urlencoded({ extended: true }), validateFoglalas, jaratFoglalas, (req, res) => {
  res.redirect(`/foglalas/${req.params.id}`);
});

export default router;
