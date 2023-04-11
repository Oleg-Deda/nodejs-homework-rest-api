const { removeContact } = require("../models/contacts");
const statusError = require("../helpers/statusError");

const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	const contact = await removeContact(contactId);
	if (!contact) {
		throw statusError(404, "Not found");
	}
	res.status(200).json({ message: "contact deleted" });
	
};

module.exports = deleteContact;

