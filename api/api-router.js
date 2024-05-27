import express from 'express';
import { deleteFoglalas } from './delete-foglalas.js';
import { showDetails } from './show-details.js';

const router = express.Router();

router.get('/jaratDetails/:id', showDetails);

router.delete('/foglalas/:foglalasID', deleteFoglalas);

export default router;
