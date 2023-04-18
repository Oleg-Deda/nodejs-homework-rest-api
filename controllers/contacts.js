const { ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contactSchema");
const { statusError } = require("../helpers/index");

const getAllContacts = async (req, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
};

const getById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findById(contactId);
	
	res.status(200).json(contact);
};

const changeContact = async (req, res) => {
	const contact =await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true });

	res.status(200).json(contact);
};


const addContact = async (req, res) => {
	const contact = await Contact.create(req.body);
	res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndDelete(contactId);
	if (!result) {
		throw statusError(404, `Contact with ${contactId} not found`);
	  }
	res.status(200).json({ message: "Contact successfully deleted"})
};

const updateContactStatus = async (req, res) => {
	const contact = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {new: true});
	res.status(200).json(contact);
};

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getById: ctrlWrapper(getById),
	addContact: ctrlWrapper(addContact),
	deleteContact: ctrlWrapper(deleteContact),
	changeContact: ctrlWrapper(changeContact),
	updateContactStatus: ctrlWrapper(updateContactStatus),
};