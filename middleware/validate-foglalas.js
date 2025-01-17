import { findDayByJaratID } from '../db/jaratok.js';

const weekday = ['Vasarnap', 'Hetfo', 'Kedd', 'Szerda', 'Csutortok', 'Pentek', 'Szombat'];

export default async function validateFoglalas(req, res, next) {
  const d = /^\d{4}-\d{2}-\d{2}$/;
  if (!d.test(req.body.datum)) {
    console.error('Ervenytelen datum');
    res.sendStatus(400);
    return;
  }
  const today = new Date();
  const d2 = new Date(req.body.datum);
  if (d2 < today) {
    console.error('Multbeli datumra nem lehet foglalni');
    res.sendStatus(400);
    return;
  }
  const [response] = await findDayByJaratID(req.params.id);
  if (response.Nap !== weekday[d2.getDay()]) {
    console.error('Ervenytelen nap');
    res.sendStatus(400);
    return;
  }

  next();
}
