const { Unauthorized } = require("http-errors");
const { Contact } = require("../models/contact");

const isValidOwner = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const contactToCheck = await Contact.findById(contactId);

  if (!_id.equals(contactToCheck.owner)) {
    const error = Unauthorized("Unauthorized !!! wrong owner");
    next(error);
  }

  next();
};

module.exports = isValidOwner;
