const { getContactById } = require("../models/contacts");
const statusError = require("../helpers/statusError");

const getById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);
	if (!contact) {
		throw statusError(404, "Not found");
	}
	res.status(200).json(contact);
	};

module.exports = getById;
