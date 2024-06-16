export default function rejectNotAdmin(req, res, next) {
  if (req.session.roleID === 1) {
    next();
  } else {
    res.status(403).render('error', { title: '403 Forbidden', message: 'Admin jogosultság szükséges' });
  }
}
