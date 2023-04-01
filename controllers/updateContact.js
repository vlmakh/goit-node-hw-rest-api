const contactsOperations = require("../models/contactsOperations");
const { contactUpdateSchema } = require("../schemas/contactSchema");

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const { error } = contactUpdateSchema.validate(req.body);

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
