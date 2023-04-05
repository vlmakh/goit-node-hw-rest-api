const express = require("express");
const { contacts: ctrl } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", auth, ctrl.getContactById);

router.post("/", auth, ctrl.addContact);

router.delete("/:contactId", auth, ctrl.removeContact);

router.put("/:contactId", auth, ctrl.updateContact);

router.patch("/:contactId/favorite", auth, ctrl.updateFavorite);

module.exports = router;
