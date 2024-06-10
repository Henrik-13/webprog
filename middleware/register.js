import bcrypt from 'bcrypt';
import { insertFelhasznalo } from '../db/felhasznalok.js';

export default async function register(req, res, next) {
  try {
    const { username, password1 } = req.body;
    const hashedPassword = await bcrypt.hash(password1, 10);
    const [header] = await insertFelhasznalo(username, hashedPassword);
    console.log(`Inserted felhasznalo. Affected rows: ${header.affectedRows}`);
    next();
  } catch (error) {
    res.status(500).render('register', {
      username: req.session.username,
      regErrMess: 'Hiba a felhasználó bevezetésekor',
    });
  }
}
