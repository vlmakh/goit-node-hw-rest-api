const express = require("express");
const { users: ctrl } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.getCurrent);

router.patch("/:userId", auth, ctrl.updateSubscription);

module.exports = router;