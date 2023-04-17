const { User, userLoginSchema } = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Unauthorized } = require("http-errors");
const { SECRET } = process.env;

const login = async (req, res, next) => {
  try {
    const { error } = userLoginSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passCheck = bcrypt.compareSync(password, user.password);

    if (!user || !passCheck) {
      throw new Unauthorized("Email or password is wrong");
    }

    if (!user.verify) {
      throw new Unauthorized("Email is not verified yet");
    }

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });
    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
