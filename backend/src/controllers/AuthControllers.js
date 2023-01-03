const bcrypt = require("bcrypt");
const { generateToken } = require("../helper/jwt");

const model = require("../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const [[userExist]] = await model.user.findUser(req.body);

  if (userExist) {
    return res.status(403).json({ error: "user exist" });
  }

  const user = {
    name,
    email,
    password: hash,
  };

  model.user
    .add(user)
    .then(([result]) => {
      if (result.affectedRows === 1) {
        return res.status(201).json({ success: "Utilisateur ajouté" });
      }
      return res.sendStatus(401);
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(500);
    });

  // TODO: comprendre pourquoi ça ne fonctionne pas sans ça 🧐
  return false;
};

const login = async (req, res) => {
  const { password } = req.body;
  // 1, retrouver mon user
  model.user
    .findUser(req.body)
    .then(([[user]]) => {
      if (!user) {
        return res.status(403).json({ error: "User not found" });
      }
      // 2 vérifier le MDP
      const compare = bcrypt.compareSync(password, user.password);
      if (!compare) {
        return res.status(403).json({ error: "password incorrect" });
      }
      // 3 je retourne mon token
      const token = generateToken({ id: user.id, email: user.email });
      return res
        .cookie("user_wcs", token, { httpOnly: true, secure: "development" })
        .status(200)
        .json({ success: "tu es loggué", token });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = { register, login };
