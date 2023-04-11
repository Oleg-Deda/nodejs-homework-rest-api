const { updateContact } = require("../models/contacts");
const statusError = require("../helpers/statusError");

const changeContact = async (req, res) => {
  const contact = await updateContact(req.params.contactId, req.body);
  if (!contact) {
    throw statusError(404, "Not found");
  }
  res.status(200).json(contact);
};
module.exports = changeContact;
