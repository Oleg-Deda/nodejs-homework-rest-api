const { isValidObjectId } = require("mongoose");

const statusError = require("../helpers/statusError");
const isValidId  = (req, res, next) => {
	const { contactId } = req.params;
	if (!isValidObjectId(contactId)) {
		next(statusError(404));
	}
	next();
};

module.exports = isValidId;