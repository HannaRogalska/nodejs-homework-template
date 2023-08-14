const { Contact } = require("../../models/contact");

const getAll = async (_, res) => {
   const { _id: owner } = req.user;
   const { page = 1, limit = 20, ...query } = req.query;
   const skip = (page - 1) * limit;
  const result = await Contact.find(
    { owner, ...query },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    }
  ).populate("owner", "subscription email");
  res.json(result);
};

module.exports = getAll;
