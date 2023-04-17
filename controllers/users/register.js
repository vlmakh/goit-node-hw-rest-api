const { User, userRegSchema } = require("../../models/user");
const bcrypt = require("bcrypt");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { uid } = require("uid");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res, next) => {
  try {
    const { error } = userRegSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { name, email, password } = req.body;
    const avatarURL = gravatar.url(email, { s: "250" }, false);
    const verificationToken = uid();

    await sendEmail({
      to: `${email}`,
      from: "vlmakh@meta.ua",
      subject: "Register new user in Homework-06",
      html: `<a  href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">To confirm ${email} please follow this link</a>`,
    });

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
      verificationToken,
    });

    res.status(201).json({
      message: "New user registered successfully. Verification email sent",
      user: {
        name,
        email,
        subscription: data.subscription,
        avatar: avatarURL,
        verificationToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
