import { findByParameters } from '../db/jaratok.js';

export default async function jaratFoglalas(req, res, next) {
  try {
    const filteredJaratok = await findByParameters(req.body);
    req.filteredJaratok = filteredJaratok;
    next();
  } catch (err) {
    res
      .status(500)
      .render('error', { title: '500 Internal Server Error', message: `Search unsuccessful: ${err.message}` });
  }
}
