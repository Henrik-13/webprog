import { insertJarat } from '../db/jaratok.js';

export default async function jaratLogger(req, res, next) {
  try {
    const [header] = await insertJarat(req);
    console.log(`Inserted jarat. Affected rows: ${header.affectedRows}`);
    next();
  } catch (err) {
    res.status(500).render('error', { message: `Insertion unsuccessful: ${err.message}` });
  }
}
