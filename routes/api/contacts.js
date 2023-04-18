const router = require("express").Router();
const {
	isValidId,
	bodyValidator,
	insertBodyValidator,
	updateStatusFavorite,
} = require("../../middlewars");
const {
	getAllContacts,
	getById,
	addContact,
	deleteContact,
	changeContact,
	updateContactStatus,
} = require("../../controllers/contacts");


const { schemas } = require("../../models/contactSchema");

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getById);

router.post("/", insertBodyValidator(schemas.addSchema), addContact);

router.put("/:contactId", isValidId, bodyValidator(schemas.changeSchema), changeContact);

router.patch(
	"/:contactId/favorite",
	isValidId,
	updateStatusFavorite(schemas.changeFavoriteSchema),
	updateContactStatus,
);

router.delete("/:contactId", isValidId, deleteContact);

module.exports = router;