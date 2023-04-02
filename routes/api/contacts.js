const express = require("express");
const ctrl = require("../../controllers");
const isValidId = require("../../middlewares/isValidId");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:contactId", isValidId, ctrl.getContactById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.removeContact);

router.put("/:contactId", isValidId, ctrl.updateContact);

router.patch("/:contactId/favorite", isValidId, ctrl.updateFavorite);

module.exports = router;
