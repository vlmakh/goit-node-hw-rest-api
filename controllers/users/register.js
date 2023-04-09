const { User, userRegSchema } = require("../../models/user");
const bcrypt = require("bcrypt");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  try {
    const { error } = userRegSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { name, email, password } = req.body;
    const avatarURL = gravatar.url(email, { s: "250" }, false);
    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`Email: ${email} in use`);
    }

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const data = await User.create({
      name,
      email,
      password: hashPassword,
      avatarURL,
    });

    res.status(201).json({
      message: "New user registered successfully",
      user: {
        name,
        email,
        subscription: data.subscription,
        avatar: avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
