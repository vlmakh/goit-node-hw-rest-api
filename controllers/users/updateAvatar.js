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
    await Jimp.read(tmpPath).then((image) =>
      image.resize(250, 250).write(tmpPath)
    );

    await fs.rename(tmpPath, resPath);

    const avatarURL = path.join("avatars", avatarName);

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
      message: "Avatar updated successfully",
      user: {
        avatar: avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tmpPath);
    throw error;
  }
};

module.exports = updateAvatar;
