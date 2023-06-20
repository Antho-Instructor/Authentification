const { decodeJWT } = require("../services/jwt");

const isAuth = (req, res, next) => {
  const token = req.cookies.appjwt;
  if (!token) {
    res.send("frero, tu n'as pas de token, ce n'est pas cool");
  }

  try {
    const result = decodeJWT(token);
    req.user = result;
    next();
  } catch (error) {
    res.send("mauvais token");
  }
};

module.exports = isAuth;
