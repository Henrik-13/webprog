import { isUsernameTaken } from '../db/felhasznalok.js';

export default async function validateRegister(req, res, next) {
  const { username, password1, confirm } = req.body;
  if (!username || !password1 || !confirm) {
    res.status(400).render('register', {
      regErrMess: 'Hiányzó felhasználónév vagy jelszó',
    });
    return;
  }

  if (confirm !== password1) {
    res.status(400).render('register', {
      regErrMess: 'Nem egyeznek meg a jelszavak',
    });
    return;
  }

  try {
    const [result] = await isUsernameTaken(username);
    if (result.length > 0) {
      throw new Error();
    }
    req.username = username;
    req.roleID = 0;
  } catch (error) {
    res.status(403).render('register', {
      regErrMess: 'Felhasználónév foglalt',
    });
    return;
  }
  next();
}
