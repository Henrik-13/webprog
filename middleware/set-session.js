export default function setSession(req, res, next) {
  req.session.userID = req.userID;
  req.session.username = req.username;
  next();
}