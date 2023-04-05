const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  try {
    const data = await Contact.find({});

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
