const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const verifyBeforeSignup = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw new NotFound("User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    const data = {
      message: `Verification successful, now you can login`,
    };

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = verifyBeforeSignup;
