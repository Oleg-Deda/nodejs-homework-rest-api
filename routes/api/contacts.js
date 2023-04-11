const router = require("express").Router();
const {
	getAllContacts,
	getById,
	postContact,
	deleteContact,
	changeContact,
} = require("../../controllers");


const addSchemaValidator = require("../../middlewars/addSchemaValidator");

const schemaValidator = require("../../middlewars/SchemaValidator");
const { addSchema, changeSchema } = require("../../schema/contactsSchema");            

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", addSchemaValidator(addSchema), postContact);

router.put("/:contactId", schemaValidator(changeSchema), changeContact);

router.delete("/:contactId", deleteContact);

module.exports = router
