const contactsOperations = require("../models/contactsOperations");

const listContacts = async (req, res, next) => {
  try {
    const data = await contactsOperations.listContacts();

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
