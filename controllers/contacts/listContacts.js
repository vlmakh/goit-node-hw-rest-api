const { Contact } = require("../../models/contact");

const listContacts = async (req, res, next) => {
  const { _id } = await req.user;
  const { favorite = null, name = null, phone = null } = req.query;

  let listParams = { owner: _id };

  if (favorite) {
    listParams = { ...listParams, favorite };
  }

  if (name) {
    listParams = { ...listParams, name: { $regex: name, $options: "i" } };
  }

  if (phone) {
    listParams = { ...listParams, phone: { $regex: phone, $options: "i" } };
  }

  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;

  try {
    const data = await Contact.find(listParams, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "_id");

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = listContacts;
