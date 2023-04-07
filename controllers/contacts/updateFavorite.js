const { Contact, contactFavSchema } = require("../../models/contact");
const createError = require("http-errors");

const updateFavorite = async (req, res, next) => {
  const { _id } = await req.user;
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const { error } = contactFavSchema.validate({ favorite });

    if (error) {
      error.status = 400;
      error.message = "Missing field favorite";
      throw error;
    }

    const data = await Contact.findOneAndUpdate(
      { _id: contactId, owner: _id },
      { favorite },
      {
        new: true,
      }
    );

    if (!data) {
      throw createError(404, `Contact with id ${contactId} was not found`);
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = updateFavorite;
