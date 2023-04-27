const router = require("express").Router();
const {
  isValidId,
  bodyValidator,
  insertBodyValidator,
  updateStatus,
  authenticate,
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

router.get("/", authenticate, getAllContacts);

router.get("/:contactId", authenticate, isValidId, getById);

router.post(
  "/",
  authenticate,
  insertBodyValidator(schemas.addSchema),
  addContact
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  bodyValidator(schemas.changeSchema),
  changeContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  updateStatus(schemas.changeFavoriteSchema, "favorite"),
  updateContactStatus
);

router.delete("/:contactId", authenticate, isValidId, deleteContact);

module.exports = router;
