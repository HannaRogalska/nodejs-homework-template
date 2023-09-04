const { User } = require("../../models/user");

const {
  createError,
  sendEmail,
  createVerificationEmail,
} = require("../../helpers");

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(400, "Email not found)");
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const mail = createVerificationEmail(email, user.verificationToken);
  await sendEmail(mail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerificationEmail;
