import express from 'express';
import { deleteFoglalas } from './delete-foglalas.js';
import { showDetails } from './show-details.js';
import notLoggedIn from '../middleware/not-logged-in.js';
import rejectNotAdmin from '../middleware/reject-not-admin.js';
import { deleteJarat } from './delete-jarat.js';

const router = express.Router();

// jarat reszleteinek megjelenitese
router.get('/jaratDetails/:id', showDetails);

// foglalasok torlese
router.delete('/foglalas/:foglalasID', notLoggedIn, deleteFoglalas);

// jaratok torlese
router.delete('/:jaratID', notLoggedIn, rejectNotAdmin, deleteJarat);

export default router;
