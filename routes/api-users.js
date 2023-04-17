const express = require("express");
const { users: ctrl } = require("../controllers");
const { auth, upload } = require("../middlewares");

const router = express.Router();

router.post("/register", ctrl.register);

router.post("/login", ctrl.login);

router.get("/logout", auth, ctrl.logout);

router.get("/current", auth, ctrl.getCurrent);

router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

router.patch("/", auth, ctrl.updateSubscription);

router.get("/verify/:verificationToken", ctrl.verifyBeforeSignup);

router.post("/verify", ctrl.verifyRepeat);

module.exports = router;
