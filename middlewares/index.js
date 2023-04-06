const auth = require("../middlewares/auth");
const isValidId = require("../middlewares/isValidId");
const isValidOwner = require("../middlewares/isValidOwner");

module.exports = {
  auth,
  isValidId,
  isValidOwner,
};
