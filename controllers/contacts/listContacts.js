const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  const { _id } = await req.user;
  const { favorite } = req.query;
  const contact = !favorite
    ? { owner: _id }
    : { owner: _id, favorite: favorite };
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const data = await Contact.find(contact, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "_id");

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
