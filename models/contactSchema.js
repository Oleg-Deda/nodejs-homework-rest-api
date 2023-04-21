const { Schema, model } = require("mongoose");

const Joi = require("joi");
const { mongooseError } = require("../helpers");

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Set name for contact"],
		},
		email: {
			type: String,
		},
		phone: {
			type: String,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
	},
	{ versionKey: false },
);

const addSchema = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().required(),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

const changeFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required(),
});

const changeSchema = Joi.object({
	name: Joi.string(),
	email: Joi.string(),
	phone: Joi.string(),
	favorite: Joi.boolean(),
}).min(1);

const schemas = {
	addSchema,
	changeFavoriteSchema,
	changeSchema,
};
contactSchema.post("save", mongooseError);

const Contact = model("contact", contactSchema);

module.exports = { Contact, schemas };


