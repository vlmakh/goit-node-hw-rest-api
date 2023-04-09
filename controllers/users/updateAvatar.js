const { User } = require("../../models/userSchema");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const updateAvatar = async (req, res, next) => {
  const { path: tmpPath, originalname } = req.file;

  const avatarName = `${req.user._id}_${originalname}`;
  const resPath = path.join(
    __dirname,
    "../../",
    "public",
    "avatars",
    avatarName
  );

  try {
    await Jimp.read(tmpPath).then((image) =>
      image.resize(250, 250).write(tmpPath)
    );

    await fs.rename(tmpPath, resPath);

    const avatarURL = path.join("public", "avatars", avatarName);

    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
};

module.exports = updateAvatar;
