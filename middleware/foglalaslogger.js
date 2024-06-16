import { findUserByUsername } from '../db/felhasznalok.js';
import { insertFoglalas } from '../db/foglalasok.js';

export default async function jaratFoglalas(req, res, next) {
  try {
    const { datum } = req.body;
    // const felhasznaloid = parseInt(req.session.userID, 10);
    const [result] = await findUserByUsername(req.session.username);
    const felhasznaloid = result[0].FelhasznaloID;
    const jaratid = req.params.id;
    const [header] = await insertFoglalas(felhasznaloid, jaratid, datum);
    console.log(`Inserted foglalas. Affected rows: ${header.affectedRows}`);
    next();
  } catch (err) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Insertion unsuccessful: ${err.message}` });
  }
}
