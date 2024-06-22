export default function setSession(req, res, next) {
  req.session.username = req.username;
  req.session.roleID = req.roleID;
  next();
}
