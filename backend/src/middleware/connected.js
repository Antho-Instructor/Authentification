const { decodeToken } = require("../helper/jwt");

const connected = (req, res, next) => {
  const token = req.cookies.user_auth;
  if (!token) {
    return res.status(401).json({ error: "Pas de token" });
  }
  const decoded = decodeToken(token);
  if (!decoded) {
    return res.status(401).json({ error: "Mauvais token" });
  }
  req.user = decoded;
  return next();
};

module.exports = connected;
