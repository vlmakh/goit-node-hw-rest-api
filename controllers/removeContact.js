const { Contact } = require("../models/contactSchema");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const data = await Contact.findByIdAndDelete(contactId);

    if (!data) {
      res
        .status(404)
        .json({ message: `Contact with id ${contactId} was not found` });
      return;
    }

    res
      .status(200)
      .json({ message: "Contact deleted successfully", ...data._doc });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
