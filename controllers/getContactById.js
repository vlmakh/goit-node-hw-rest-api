const contactsOperations = require("../models/contactsOperations");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const data = await contactsOperations.getContactById(contactId);
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

module.exports = getContactById;
