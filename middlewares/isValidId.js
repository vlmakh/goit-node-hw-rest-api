const { isValidObjectId } = require("mongoose");
const { BadRequest } = require("http-errors");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    const error = BadRequest(`Requested id:${contactId} has incorrect format`);
    next(error);
  }
  next();
};

module.exports = isValidId;
