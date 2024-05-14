import express from 'express';
import * as db from '../db/jaratok.js';

const router = express.Router();

router.get(['/', '/index'], async (req, res) => {
  try {
    const [jaratok] = await db.findAllJaratok();
    res.render('jaratok', { jaratok });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

export default router;
