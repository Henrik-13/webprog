import express from 'express';
import { findJaratByID } from '../db/jaratok.js';
import { deleteFoglalas } from '../db/foglalasok.js';

const router = express.Router();

router.get('/jaratDetails/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await findJaratByID(id);
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).send('Jarat nem talalhato');
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Hiba a selectnel');
  }
});

router.delete('/foglalas/:foglalasID', async (req, res) => {
  const { foglalasID } = req.params;
  try {
    const result = await deleteFoglalas(foglalasID);
    if (result.length > 0) {
      res.json(result[0]);
    }
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).send('Hiba a deletenel');
  }
});

export default router;
