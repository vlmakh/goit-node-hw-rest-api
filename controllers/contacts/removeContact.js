const { Contact } = require("../../models/contact");

const removeContact = async (req, res, next) => {
  const { _id } = await req.user;
  const { contactId } = req.params;

  try {
    const data = await Contact.findOneAndDelete({
      _id: contactId,
      owner: _id,
    });

    if (!data) {
      res
        .status(404)
        .json({ message: `Contact with id ${contactId} was not found` });
      return;
    }

    res
      .status(200)
      .json({ message: "Contact was deleted successfully", ...data._doc });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
