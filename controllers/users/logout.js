const { User } = require("../../models/user");

const logout = async (req, res, next) => {
  try {
    const { user } = req;

    await User.findByIdAndUpdate(user._id, { token: null });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
