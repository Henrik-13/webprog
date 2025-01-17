import express from 'express';
import { findAllFoglalasok, findFoglalasokByFelhasznalo } from '../db/foglalasok.js';
import notLoggedIn from '../middleware/not-logged-in.js';

const router = express.Router();

router.use(notLoggedIn);

router.get('/', async (req, res) => {
  try {
    let foglalasok;
    if (req.session.roleID === 1) {
      // admin eseten osszes foglalas
      [foglalasok] = await findAllFoglalasok();
    } else {
      // felhasznalo eseten sajat foglalasok
      [foglalasok] = await findFoglalasokByFelhasznalo(req.session.username);
    }
    res.render('osszes-foglalas', {
      foglalasok,
      username: req.session.username,
      roleID: req.session.roleID,
    });
  } catch (error) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Selection unsuccessful: ${error.message}` });
  }
});

export default router;
