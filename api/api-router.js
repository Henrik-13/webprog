import express from 'express';
import { deleteFoglalas } from './delete-foglalas.js';
import { showDetails } from './show-details.js';
import notLoggedIn from '../middleware/not-logged-in.js';

const router = express.Router();

router.get('/jaratDetails/:id', showDetails);

router.delete('/foglalas/:foglalasID', notLoggedIn, deleteFoglalas);

export default router;
