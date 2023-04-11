const { User } = require("../../models/user");
const { NotFound, BadRequest } = require("http-errors");
const sendEmail = require("../../helpers/sendEmail");

const verifyRepeat = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw new BadRequest("Missing required field email");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new NotFound("User not found");
    }

    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }

    await sendEmail({
      to: `${email}`,
      from: "vlmakh@meta.ua",
      subject: "Register new user in Homework-06",
      html: `<a  href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">To confirm ${email} please follow this link</a>`,
    });

    const data = {
      message: "Verification email sent",
    };

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = verifyRepeat;
