const express = require("express");

const router = express.Router();

const authController = require("./controllers/authController");
const isAuth = require("./middleware/authMiddleware");

/**
 * Auth
 *
 * Nous allons ici, créer nos 2 routes concernant l'authentification d'un user
 *
 * /register, est l'endpoint qui permettra d'enregistrer un user
 * /login, est l'endpoint qui permettre de se log
 *
 * Nous allons donc avoir, 2 controllers associés, 1 pour chaque route
 */

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.get("/home", isAuth, (req, res) => {
  res.send("je sais que tu es loggé");
});

module.exports = router;
