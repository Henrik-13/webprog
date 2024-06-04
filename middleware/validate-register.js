import { isFelhasznalonevTaken } from '../db/felhasznalok.js';

export default async function validateRegister(req, res, next) {
  const { username, password1, confirm } = req.body;
  if (!username || !password1 || !confirm) {
    res.status(400).render('register', {
      username: req.session.username,
      regErrMess: 'Hiányzó felhasználónév vagy jelszó',
    });
    return;
  }

  if (confirm !== password1) {
    res.status(400).render('register', {
      username: req.session.username,
      regErrMess: 'Nem egyeznek meg a jelszavak',
    });
    return;
  }

  try {
    const [result] = await isFelhasznalonevTaken(username);
    if (result.length > 0) {
      throw new Error();
    }
  } catch (error) {
    res.status(403).render('register', {
      username: req.session.username,
      regErrMess: 'Felhasználónév foglalt',
    });
    return;
  }
  next();
}
