const statusError = require("../helpers/statusError");
const { objectFieldsValidator } = require("../helpers");
const insertBodyValidator = (schema) => {
	const valid = (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			const alertMessage = objectFieldsValidator(req.body);
			next(statusError(400, alertMessage));
		}
		next();
	};
	return valid;
};

module.exports = insertBodyValidator;