const express = require("express");

const router = express.Router();

const AuthControllers = require("../controllers/AuthControllers");

/**
 * Nous allons créer 2 routes
 * 1- register
 * 2- login
 */

// 🚧 Nous allons nous interesser à la route register uniquement.

router.post("/register", AuthControllers.register);
router.post("/login", AuthControllers.login);

module.exports = router;
