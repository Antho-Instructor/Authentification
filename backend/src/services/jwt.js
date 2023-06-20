const jwt = require("jsonwebtoken");

const encodeJWT = (data) => {
  return jwt.sign(data, process.env.SECRET_JWT, { expiresIn: "1h" });
};

const decodeJWT = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_JWT);
  } catch (err) {
    throw new Error("JWT mauvais");
  }
};

module.exports = {
  encodeJWT,
  decodeJWT,
};
