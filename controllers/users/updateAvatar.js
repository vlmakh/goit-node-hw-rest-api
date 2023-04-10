const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tmpPath, originalname } = req.file;

  const avatarName = `${_id}_${originalname}`;
  const resPath = path.join(
    __dirname,
    "../../",
    "public",
    "avatars",
    avatarName
  );

  try {
    const newAvatar = await Jimp.read(tmpPath);

    newAvatar.cover(250, 250).write(resPath);

    const avatarURL = path.join("avatars", avatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      message: "Avatar updated successfully",
      user: {
        avatar: avatarURL,
      },
    });
  } catch (error) {
    next(error);
  } finally {
    await fs.unlink(tmpPath);
  }
};

module.exports = updateAvatar;
