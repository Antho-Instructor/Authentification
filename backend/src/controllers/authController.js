const models = require("../models");
const argon = require("../services/argon");
const { encodeJWT } = require("../services/jwt");

/**
 *
 * La fonction `register` permet d'enregistrer un nouvel utilisateur dans ma DB.
 *
 * DB: database
 *
 */
const register = async (req, res) => {
  // Ici, j'utilise une méthode `findByMail` que j'ai créer qui prend 1 argument, l'email
  // elle se trouve dans UserManager.js
  const [isRegistered] = await models.user.findByMail(req.body.email);

  /**
   * si le retour est différent de 0; c'est à dire qu'un user existe donc,
   * celui ci s'arretera pour informer l'utilisateur que cet email existe déjà en DB
   */
  if (isRegistered.length !== 0) {
    return res
      .status(403)
      .json({ message: "Cet email existe déjà, connecte toi !" });
  }

  // Si je suis ici, c'est que le user n'a pas d'email dans la DB, donc je peux hash le password
  // J'utilise un service perso que j'ai nommé `argon` (service/argon.js)
  // celui ci prend 1 argument, le password, et retourne le password hashé
  const hashPwd = await argon.hashPwd(req.body.password);

  /**
   * Je créer un user qui à la forme suivante pour que celui ci corresponde à ce que j'ai mis dans le models UserManager.js
   */
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashPwd,
  };

  try {
    /**
     * Avec la méthode `registerUser` qui prend un user en paramètre, celui ci permet de sauvegarder mon utiliser en DB
     */
    const [addUser] = await models.user.registerUser(user);

    // Si l'ajout est bon, alors
    if (addUser.affectedRows !== 1) {
      res.json({ message: "Il y a eu un problème" });
    }
    return res.json({ message: "L'utilisateur à bien été ajouté 👍" });
  } catch (error) {
    // Si une erreur server est détécté, alors envoi ça
    console.error(error.message);
    return res.status(500).json({ message: "error server" });
  }
};

/**
 *
 * La fonction `login` permet de s'authentifier sur mon site
 *
 */
const login = async (req, res) => {
  try {
    /**
     * userLogged (car je n'ai pas d'idée je le rappel)
     * est le retour de ma vérfication de mon password, en effet, `decryptPwd` prend 2 paramètres, le password & l'email;
     * L'email permet d'aller selectionne le bon user pour avoir son MDP
     * Et le mot de passe, permet d'avoir la certitude que celui est bon en le comparant avec celui qui l'a renseigné
     */

    const userLogged = await argon.decryptPwd(
      req.body.password,
      req.body.email
    );

    // delete permet de supprimer une clé dans un obj, en l'occurrence, ici, c'est le password
    delete userLogged.password;

    // si j'ai un user alors
    if (userLogged) {
      // res.json({ token: encodeJWT(userLogged) });
      res
        .cookie("appjwt", encodeJWT(userLogged), {
          httpOnly: true,
        })
        .status(200)
        .json({ message: `Salutation ${userLogged.name}`, ...userLogged });
    } else {
      res.status(401).json({ message: "Oups, error email ou mdp" });
    }
  } catch (error) {
    res.status(500).json({ message: "oups, error server" });
  }
};

const logout = (req, res) => {
  res.clearCookie("appjwt").status(200).json({ message: "User logged out" });
};

// clearCookie

module.exports = {
  register,
  login,
  logout,
};
