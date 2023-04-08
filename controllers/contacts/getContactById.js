const { Contact } = require("../../models/contact");
const createError = require("http-errors");

const getContactById = async (req, res, next) => {
  const { _id } = await req.user;
  const { contactId } = req.params;

  try {
    const data = await Contact.findOne({ _id: contactId, owner: _id });

    if (!data) {
      throw createError(404, `Contact with id ${contactId} was not found`);
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
