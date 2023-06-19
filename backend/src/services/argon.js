const argon2 = require("@node-rs/argon2");
const models = require("../models");

async function hashPwd(password) {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    console.error(err);
    return err.message;
  }
}

async function decryptPwd(password, email) {
  try {
    const [[user]] = await models.user.findByMail(email);

    if (user !== undefined) {
      if (await argon2.verify(user.password, password)) {
        return user;
      }
      return false;
    }
    return false;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
}

module.exports = {
  hashPwd,
  decryptPwd,
};
