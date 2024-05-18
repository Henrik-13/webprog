import { insertFoglalas } from '../db/foglalasok.js';

export default async function jaratFoglalas(req, res, next) {
  try {
    // console.log(req.body);
    const { nev: felhasznaloid, datum } = req.body;
    const jaratid = req.params.id;
    const id = parseInt(felhasznaloid, 10);
    const [header] = await insertFoglalas({ id, jaratid, datum });
    console.log(`Inserted foglalas. Affected rows: ${header.affectedRows}`);
    next();
  } catch (err) {
    res.status(500).render('error', { message: `Insertion unsuccessful: ${err.message}` });
  }
}
