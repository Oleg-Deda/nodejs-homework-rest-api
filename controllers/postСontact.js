const { addContact } = require("../models/contacts");
const { validator } = require("../middlewars/validator");
const objectFieldsChecker = require("../middlewars/objectFieldsValidator");
const postContact = async (req, res, next) => {
	if (validator(req.body).error) {
		const alertMessage = objectFieldsChecker(req.body);
		res.status(400).json({ message: alertMessage });
		return;
	}
	const contact = await addContact(req.body);
	res.status(201).json(contact);
	next();
};

module.exports = postContact;
