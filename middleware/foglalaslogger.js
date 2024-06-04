import { insertFoglalas } from '../db/foglalasok.js';

export default async function jaratFoglalas(req, res, next) {
  try {
    const { datum } = req.body;
    const felhasznaloid = parseInt(req.session.userID, 10);
    console.log(felhasznaloid);
    const jaratid = req.params.id;
    // const id = parseInt(felhasznaloid, 10);
    const [header] = await insertFoglalas(felhasznaloid, jaratid, datum);
    console.log(`Inserted foglalas. Affected rows: ${header.affectedRows}`);
    next();
  } catch (err) {
    res.status(500).render('error', { message: `Insertion unsuccessful: ${err.message}` });
  }
}
