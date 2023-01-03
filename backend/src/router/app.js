const express = require("express");

const router = express.Router();

const itemControllers = require("../controllers/itemControllers");

const middleware = require("../middleware/connected");

router.get("/items", middleware, itemControllers.browse);

module.exports = router;
