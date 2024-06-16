import express from 'express';
import { deleteFoglalas } from './delete-foglalas.js';
import { showDetails } from './show-details.js';
import notLoggedIn from '../middleware/not-logged-in.js';
import rejectNotAdmin from '../middleware/reject-not-admin.js';
import { deleteJarat } from './delete-jarat.js';

const router = express.Router();

router.get('/jaratDetails/:id', showDetails);

router.delete('/foglalas/:foglalasID', notLoggedIn, deleteFoglalas);

router.delete('/:jaratID', notLoggedIn, rejectNotAdmin, deleteJarat);

export default router;
