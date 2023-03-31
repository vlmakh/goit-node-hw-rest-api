const contactsOperations = require("../models/contactsOperations");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

const addContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);

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
