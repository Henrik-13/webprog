import { insertFoglalas } from '../db/foglalasok.js';

export default async function jaratFoglalas(req, res, next) {
  try {
    const [header] = await insertFoglalas(req);
    console.log(`Inserted foglalas. Affected rows: ${header.affectedRows}`);
    next();
  } catch (err) {
    res.status(500).render('error', { message: `Insertion unsuccessful: ${err.message}` });
  }
}
