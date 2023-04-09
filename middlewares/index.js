const auth = require("../middlewares/auth");
const isValidId = require("../middlewares/isValidId");
const upload = require("../middlewares/upload");

module.exports = {
  auth,
  isValidId,
  upload,
};
