const { Contact, contactAddSchema } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const data = await Contact.create(req.body);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
