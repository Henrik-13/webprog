import express from 'express';
import { findAllJaratok, findAtszallasosJaratok, findByParameters } from '../db/jaratok.js';
import jaratKereses from '../middleware/jaratkereses.js';

const router = express.Router();

router.get(['/', '/index'], async (req, res) => {
  try {
    const [jaratok] = await findAllJaratok();
    res.render('jaratok', {
      jaratok,
      username: req.session.username,
      roleID: req.session.roleID,
    });
  } catch (err) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Selection unsuccessful: ${err.message}` });
  }
});

router.post(['/', '/index'], express.urlencoded({ extended: true }), jaratKereses, async (req, res) => {
  try {
    let atszallasosJaratok;
    // atszallasos jaratok megkeresese
    if (req.body.atszallas) {
      atszallasosJaratok = await findAtszallasosJaratok(req.body);
    }
    const [filteredJaratok] = await findByParameters(req.body);
    res.render('jaratok', {
      jaratok: filteredJaratok,
      atszallasosJaratok,
      username: req.session.username,
      roleID: req.session.roleID,
    });
  } catch (err) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Selection unsuccessful: ${err.message}` });
  }
});

export default router;
