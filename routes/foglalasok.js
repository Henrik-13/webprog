import express from 'express';
import jaratFoglalas from '../middleware/foglalaslogger.js';
import validateFoglalas from '../middleware/validate-foglalas.js';
import notLoggedIn from '../middleware/not-logged-in.js';
import getKezdDatum from '../middleware/get-kezd-datum.js';
import getFoglalasok from '../middleware/get-foglalasok.js';

const router = express.Router();

function getURL(IDs) {
  const { id, id2, id3 } = IDs;
  let url = '/foglalas';
  if (id) url += `/${id}`;
  if (id2) url += `/${id2}`;
  if (id3) url += `/${id3}`;
  return url;
}

router.get('/:id/:id2?/:id3?', getKezdDatum, getFoglalasok, (req, res) => {
  try {
    const { message } = req.query; // torles utani uzenet
    const { jaratok } = req; // jaratok amire eppen foglalunk
    const { kezdDatum } = req; // elso datum amire lehet foglalni
    const { foglalasok } = req; // mar meglevo foglalasok
    const action = getURL(req.params, req.jaratok); // url amire kuldjuk a form valaszat

    res.render('foglalasok', {
      foglalasok,
      jaratok,
      kezdDatum,
      message,
      action,
      username: req.session.username,
      roleID: req.session.roleID,
    });
  } catch (err) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Selection unsuccessful: ${err.message}` });
  }
});

router.post(
  '/:id/:id2?/:id3?',
  express.urlencoded({ extended: true }),
  notLoggedIn, // bejelentkezes szukseges
  validateFoglalas, // foglalas validalasa
  jaratFoglalas, // foglalas beszurasa
  (req, res) => {
    const url = getURL(req.params);
    try {
      res.redirect(`${url}?message=Foglalás sikeres`);
    } catch (err) {
      res.redirect(`${url}?message=Hiba történt a foglalás során`);
    }
  },
);

export default router;
