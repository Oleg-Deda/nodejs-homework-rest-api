const statusError = require("../helpers/statusError");
require("dotenv").config();

const { User } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const { JWT_KEY  } = process.env;
const authenticate = async (req, res, next) => {
	const { authorization = "" } = req.headers;
	const [bearer, token] = authorization.split(" ");
	if (bearer !== "Bearer") {
		next(statusError(401));
	}
	try {
		const { id } = jwt.verify(token, JWT_KEY );
		const user = await User.findById(id);
		if (!user || !user.token || user.token !== token) {
			next(statusError(401));
		}
		req.user = user;
		next();
	} catch {
		next(statusError(401));
	}
};

module.exports = authenticate;