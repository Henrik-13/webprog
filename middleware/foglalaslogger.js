import { findUserByUsername } from '../db/felhasznalok.js';
import { insertFoglalas } from '../db/foglalasok.js';

export default async function jaratFoglalas(req, res, next) {
  try {
    const { datum } = req.body;
    const [result] = await findUserByUsername(req.session.username);
    const felhasznaloid = result[0].FelhasznaloID;
    const { id, id2, id3 } = req.params;

    const [header] = await insertFoglalas(felhasznaloid, id, datum);
    console.log(`Inserted foglalas. Affected rows: ${header.affectedRows}`);
    if (id2) {
      const [header2] = await insertFoglalas(felhasznaloid, id2, datum);
      console.log(`Inserted foglalas. Affected rows: ${header2.affectedRows}`);
    }
    if (id3) {
      const [header3] = await insertFoglalas(felhasznaloid, id3, datum);
      console.log(`Inserted foglalas. Affected rows: ${header3.affectedRows}`);
    }

    next();
  } catch (err) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Insertion unsuccessful: ${err.message}` });
  }
}
