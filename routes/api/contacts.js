const express = require('express')
const router = express.Router()
const getAllContacts = require("../../controllers/getAllContacts");
const changeContact = require("../../controllers/changeContact");
const getById = require("../../controllers/getById");
const deleteContact = require("../../controllers/deleteContact");
const postContact = require("../../controllers/postСontact");               

router.get("/", getAllContacts);

router.get("/:contactId", getById);

router.post("/", postContact);

router.delete("/:contactId", deleteContact);

router.put("/:contactId", changeContact);

module.exports = router
