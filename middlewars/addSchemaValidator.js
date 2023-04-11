const statusError = require("../helpers/statusError");
const objectFieldsChecker = require("../helpers/objectFieldsChecker");
const addSchemaValidator = (schema) => {
	const valid = (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			const alertMessage = objectFieldsChecker(req.body);
			next(statusError(400, alertMessage));
		}
		next();
	};
	return valid;
};

module.exports = addSchemaValidator;