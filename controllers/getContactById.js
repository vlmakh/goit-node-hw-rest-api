const { Contact } = require("../models/contactSchema");
// const createError = require("http-errors");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const data = await Contact.findById(contactId);
    console.log(data);

    if (!data) {
      // throw createError(404, `Contact with id ${contactId} was not found`);
      res
        .status(404)
        .json({ message: `Contact with id ${contactId} was not found` });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
