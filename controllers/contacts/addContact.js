const { Contact, contactAddSchema } = require("../../models/contact");

const addContact = async (req, res, next) => {
  const { _id } = await req.user;

  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const data = await Contact.create({ ...req.body, owner: _id });

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
