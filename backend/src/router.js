const express = require("express");

const router = express.Router();

const authController = require("./controllers/authController");

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

module.exports = router;