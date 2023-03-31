const contactsOperations = require("../models/contactsOperations");
const { contactAddSchema } = require("../schemas/contactSchema");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const data = await contactsOperations.addContact(req.body);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
