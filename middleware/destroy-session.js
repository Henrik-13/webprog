export default function destroySession(req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).render('error', { title: '500 Internal Server Error', message: 'Hiba kijelentkezéskor' });
    } else {
      next();
    }
  });
}
