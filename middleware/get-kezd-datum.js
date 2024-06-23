import { findJaratByID } from '../db/jaratok.js';

export default async function getKezdDatum(req, res, next) {
  try {
    const { id, id2, id3 } = req.params;
    const jaratIDs = [id, id2, id3].filter(Boolean);
    let jaratok = await Promise.all(jaratIDs.map(findJaratByID));
    jaratok = jaratok.map(([[jarat]]) => jarat);
    req.jaratok = jaratok;
    const nap = jaratok[0].Nap;

    const napok = {
      Vasarnap: 0,
      Hetfo: 1,
      Kedd: 2,
      Szerda: 3,
      Csutortok: 4,
      Pentek: 5,
      Szombat: 6,
    };
    const date = new Date();
    const today = date.getUTCDay();
    const kezdNap = napok[nap];
    const hatralevoNapok = (kezdNap + 7 - today) % 7 || 7;
    const kezdDatum = new Date(date);
    kezdDatum.setUTCDate(date.getUTCDate() + hatralevoNapok);
    const datum = kezdDatum.toISOString().split('T')[0];

    req.kezdDatum = datum;
    next();
  } catch (error) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Search unsuccessful: ${error.message}` });
  }
}
