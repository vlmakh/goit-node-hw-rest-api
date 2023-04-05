const { User, userRegSchema } = require("../../models/user");
const bcrypt = require("bcrypt");
const { Conflict } = require("http-errors");

const register = async (req, res, next) => {
  try {
    const { error } = userRegSchema.validate(req.body);

    if (error) {
      error.status = 400;
      throw error;
    }

    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict(`Email: ${email} in use`);
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const data = await User.create({ name, email, password: hashPassword });

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
