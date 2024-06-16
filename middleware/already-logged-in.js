export default function alreadyLoggedIn(req, res, next) {
  if (!req.session.username) {
    next();
  } else {
    res.status(403).render('error', { title: '403 Forbidden', message: 'Már be van jelentkezve.' });
  }
}
