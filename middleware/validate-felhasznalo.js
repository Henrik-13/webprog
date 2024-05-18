// import { findAllFelhasznalok } from '../db/felhasznalok.js';

export default function validateUser(req, res, next) {
  if (!req.body.nev) {
    console.log('Nincs megadva felhasznalonev');
    res.sendStatus(400);
    return;
  }
  // const [users] = findAllFelhasznalok();
  // if (users.id.includes(req.body.felhasznaloid)) {
  //   console.log('Nem letezik a megadott felhasznalo');
  //   res.sendStatus(400);
  //   return;
  // }
  next();
}
