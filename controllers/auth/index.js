const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const updtSubscription = require("./updtSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerificationEmail = require("./resendVerificationEmail");

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updtSubscription,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail,
};
