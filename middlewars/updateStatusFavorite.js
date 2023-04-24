const statusError = require("../helpers/statusError");

const updateStatus = (schema , fieldName) => {
	const valid = (req, res, next) => {
		if (!Object.keys(req.body).length) {
			next(statusError(400, `missing field ${fieldName}`));
		}
		const { error } = schema.validate(req.body);
		if (error) {
			next(statusError(400, error.message));
		}
		next();
	};
	return valid;
};

module.exports = updateStatus;