import { findFoglalasByFelhasznaloAndJarat, findFoglalasByJaratID } from '../db/foglalasok.js';

async function getFoglalasokByJarat(id, roleID, username, foglalasok) {
  let foglalas;
  if (roleID === 1) {
    [foglalas] = await findFoglalasByJaratID(id);
  } else {
    [foglalas] = await findFoglalasByFelhasznaloAndJarat(id, username);
  }
  foglalasok = [...foglalasok, ...foglalas];
  return foglalasok;
}

export default async function getFoglalasok(req, res, next) {
  try {
    const { id, id2, id3 } = req.params;
    let foglalasok = [];
    foglalasok = await getFoglalasokByJarat(id, req.session.roleID, req.session.username, foglalasok);

    if (id2) {
      foglalasok = await getFoglalasokByJarat(id2, req.session.roleID, req.session.username, foglalasok);
    }

    if (id3) {
      foglalasok = await getFoglalasokByJarat(id3, req.session.roleID, req.session.username, foglalasok);
    }
    req.foglalasok = foglalasok;
    next();
  } catch (error) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Search unsuccessful: ${error.message}` });
  }
}
