const { Contact } = require("../../models/contact");

const createError = require("../../helpers/createError");

const updateFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.status(200).json(result);
};

module.exports = updateFavorite;
