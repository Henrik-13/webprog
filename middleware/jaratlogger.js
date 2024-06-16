import { insertJarat } from '../db/jaratok.js';

export default async function jaratLogger(req, res, next) {
  try {
    // console.log(req.body);
    const [header] = await insertJarat(req.body);
    console.log(`Inserted jarat. Affected rows: ${header.affectedRows}`);
    next();
  } catch (err) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Insertion unsuccessful: ${err.message}` });
  }
}
