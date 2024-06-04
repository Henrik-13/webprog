export default function alreadyLoggedIn(req, res, next) {
  if (!req.session.userID) {
    next();
  } else {
    res.status(403).render('error', { title: '403 forbidden', message: 'Már be van jelentkezve.' });
  }
}
