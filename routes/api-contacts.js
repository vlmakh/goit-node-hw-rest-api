const express = require("express");
const { contacts: ctrl } = require("../controllers");
const { auth, isValidId, isValidOwner } = require("../middlewares");

const router = express.Router();

router.get("/", auth, ctrl.listContacts);

router.get("/:contactId", auth, isValidId, isValidOwner, ctrl.getContactById);

router.post("/", auth, ctrl.addContact);

router.delete("/:contactId", auth, isValidId, isValidOwner, ctrl.removeContact);

router.put("/:contactId", auth, isValidId, isValidOwner, ctrl.updateContact);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  isValidOwner,
  ctrl.updateFavorite
);

module.exports = router;
