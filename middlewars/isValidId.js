const { isValidObjectId } = require("mongoose");

const statusError = require("../helpers/statusError");
const isValidId  = (req, res, next) => {
	const { contactId } = req.params;
	if (!isValidObjectId(contactId)) {
		next(statusError(404, "Not found"));
	}
	next();
};

module.exports = isValidId;