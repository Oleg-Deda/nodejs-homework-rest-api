const router = require("express").Router();
const {
	validObjectId,
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

router.get("/:contactId", validObjectId, getById);

router.post("/", insertBodyValidator(schemas.addSchema), addContact);

router.put("/:contactId", validObjectId, bodyValidator(schemas.changeSchema), changeContact);

router.patch(
	"/:contactId/favorite",
	validObjectId,
	updateStatusFavorite(schemas.changeFavoriteSchema),
	updateContactStatus,
);

router.delete("/:contactId", validObjectId, deleteContact);

module.exports = router;