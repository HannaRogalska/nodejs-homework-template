const { BASE_URL } = process.env;

const createVerificationEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Registration confirmation email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Email verification</a>`,
  };

  return mail;
};

module.exports = createVerificationEmail;
