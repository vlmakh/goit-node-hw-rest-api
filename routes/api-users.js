const express = require("express");
const { users: ctrl } = require("../controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.getCurrent);

router.patch("/:userId", auth, ctrl.updateSubscription);

module.exports = router;
