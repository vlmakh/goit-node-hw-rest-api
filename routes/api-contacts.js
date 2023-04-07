const express = require("express");
const { contacts: ctrl } = require("../controllers");
const { auth, isValidId } = require("../middlewares");

const router = express.Router();

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", auth, isValidId, ctrl.getContactById);

router.post("/", auth, ctrl.addContact);

router.delete("/:contactId", auth, isValidId, ctrl.removeContact);

router.put("/:contactId", auth, isValidId, ctrl.updateContact);

router.patch("/:contactId/favorite", auth, ctrl.updateFavorite);

module.exports = router;
