import express from 'express';
import notLoggedIn from '../middleware/not-logged-in.js';
import destroySession from '../middleware/destroy-session.js';

const router = express.Router();

router.use('/', notLoggedIn);

router.post('/', destroySession, (req, res) => {
  res.redirect('/');
});

export default router;
