const { Contact, contactUpdateSchema } = require("../models/contact");
const createError = require("http-errors");

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = contactUpdateSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const data = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!data) {
      throw createError(404, `Contact with id ${contactId} was not found`);
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContact;
