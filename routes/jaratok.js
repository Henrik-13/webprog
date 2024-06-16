import express from 'express';
import { findAllJaratok, findByParameters } from '../db/jaratok.js';
import jaratKereses from '../middleware/jaratkereses.js';

const router = express.Router();

router.get(['/', '/index'], async (req, res) => {
  try {
    const [jaratok] = await findAllJaratok();
    res.render('jaratok', {
      jaratok,
      /* userID: req.session.userID, */ username: req.session.username,
      roleID: req.session.roleID,
    });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

router.post(['/', '/index'], express.urlencoded({ extended: true }), jaratKereses, async (req, res) => {
  try {
    const [filteredJaratok] = await findByParameters(req.body);
    res.render('jaratok', { jaratok: filteredJaratok });
  } catch (err) {
    res.status(500).render('error', { message: `Selection unsuccessful: ${err.message}` });
  }
});

export default router;
