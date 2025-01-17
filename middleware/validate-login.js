import bcrypt from 'bcrypt';
import { findUserByUsername } from '../db/felhasznalok.js';

export default async function validateLogin(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).render('login', {
        loginErrMess: 'Hiányzó felhasználónév vegy jelszó',
      });
      return;
    }
    const result = await findUserByUsername(username);
    const user = result[0][0];
    if (!user) {
      throw new Error();
    }
    if (await bcrypt.compare(password, user.Jelszo)) {
      req.userID = user.FelhasznaloID;
      req.username = user.Nev;
      req.roleID = user.JogID;
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).render('login', {
      username: req.session.username,
      loginErrMess: 'Hibás felhasználónév vegy jelszó',
    });
  }
}
