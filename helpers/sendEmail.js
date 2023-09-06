const nodemailer = require("nodemailer");

const { APP_PASSWORD } = process.env;
const {MAIL_USER} = process.env

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: APP_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const mail = { ...data, from: MAIL_USER };

  try {
    await transport.sendMail(mail);
    console.log("Email send success");
  } catch (error) {
    console.error(error.message);
  }
};

// const sgMail = require("@sendgrid/mail");
// require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendEmail = async (data) => {
//   const mail = { ...data, from: "hanrogalska@gmail.com" };
//   await sgMail.send(mail);
//   return true;
// };

module.exports = sendEmail;
