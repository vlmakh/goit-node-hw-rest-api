const { Contact, contactFavSchema } = require("../../models/contact");
const createError = require("http-errors");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const { error } = contactFavSchema.validate({ favorite });

    if (error) {
      error.status = 400;
      error.message = "missing field favorite";
      throw error;
    }

    const data = await Contact.findByIdAndUpdate(
      contactId,
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
