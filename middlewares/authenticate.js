const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_KEY } = process.env;
const { createError } = require("../helpers");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer = "", token = ""] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401);
    }

    try {
      const { id } = jwt.verify(token, SECRET_KEY);
      const user = await User.findById(id);
      console.log(user);
      console.log(user.token);
      if (!user || !user.token) {
        throw Error("Not authorized");
      }

      req.user = user;
      next();
    } catch (error) {
      throw createError(401, error.message);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
