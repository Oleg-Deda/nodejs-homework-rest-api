const { updateContact } = require("../models/contacts");
const { emptyObject } = require("../middlewars/validator");

const changeContact = async (req, res, next) => {
	if (emptyObject(req.body).error) {
		return res.status(400).json({ message: "missing fields" });
	}
	const contact = await updateContact(req.params.contactId, req.body);
	if (!contact) {
		return res.status(404).json({ message: "Not found" });
	}
	res.status(200).json(contact);
	next();
};

module.exports = changeContact;

