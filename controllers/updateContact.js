const contactsOperations = require("../models/contactsOperations");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const data = await contactsOperations.updateContact(contactId, req.body);
    if (!data) {
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

module.exports = updateContact;
