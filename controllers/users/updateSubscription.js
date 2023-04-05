const { User, userSubsrSchema } = require("../../models/user");
const createError = require("http-errors");

const updateSubscription = async (req, res, next) => {
  const { userId } = req.params;
  const { subscription } = req.body;

  try {
    const { error } = userSubsrSchema.validate({ subscription });

    if (error) {
      error.status = 400;
      error.message = "Missing field subscription";
      throw error;
    }

    const data = await User.findByIdAndUpdate(
      userId,
      { subscription },
      {
        new: true,
      }
    );

    if (!data) {
      throw createError(404, `User with id ${userId} was not found`);
    }
    res.status(200).json({
      message: "Status updated successfully",
      user: {
        email: data.email,
        subscription: data.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
