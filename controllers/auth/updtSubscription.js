const { User } = require("../../models/user.js");
const { createError } = require("../../helpers");

const updtSubscription = async (req, res) => {
  const { _id: id } = req.user;
  const { subscription } = req.body;

  const result = await User.findByIdAndUpdate(
    `{$id}`,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw createError(404);
  }
  res.status(200).json(result);
};

module.exports = updtSubscription;
