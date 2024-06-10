export default function notLoggedIn(req, res, next) {
  if (req.session.userID) {
    next();
  } else {
    res.status(401).render('error', { title: '401 Unauthorized', message: 'Bejelentkezés szükséges.' });
  }
}
