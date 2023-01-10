const router = require("express").Router();
const userController = require("./contoller");

router.post("/register", userController.register);

module.exports = router;
