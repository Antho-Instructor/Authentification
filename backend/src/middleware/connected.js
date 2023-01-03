const connected = (req, res, next) => {
  console.warn(req.cookies);
  next();
};

module.exports = connected;
