import express from 'express';
import * as db from '../db/foglalasok.js';

const router = express.Router();

router.get(['/foglalasok'], async (req, res) => {
  try {
    const [foglalasok] = await db.findAllFoglalasok();
    res.render('foglalasok', { foglalasok });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

export default router;
