const statusError = require("../helpers/statusError");

const schemaValidator = (schema) => {
	const valid = (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			next(statusError(400, error.message));
		}
		next();
	};
	return valid;
};

module.exports = schemaValidator;