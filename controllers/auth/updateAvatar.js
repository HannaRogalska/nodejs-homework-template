const fs = require("fs/promises");
const path = require("path");
const jimp = require("jimp");

const { User } = require("../../models/user");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const extension = originalname.split(".").pop();
    const filename = `${_id}.${extension}`;
    const resultUpload = path.join(avatarDir, filename);

    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", originalname);

    Jimp.read(avatarURL)
      .then((image) => {
        return image
          .resize(250, 250) // resize
          .write(avatarURL); // save
      })
      .catch((err) => {
        console.error(err);
      });

    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
