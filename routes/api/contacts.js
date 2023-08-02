const express = require('express')

const router = express.Router()

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = require("../../models/contacts");
const Joi = require('joi');

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
   try {
     const result = await listContacts();
     res.json({ result });
   } catch (error) {
     next(error);
   }
})

router.get('/:contactId', async (req, res, next) => {
   try {
     const { contactId } = req.params;
     const result = await getContactById(contactId);
     if (!result) {
       throw createError(404);
     }
     res.json(result);
   } catch (error) {
     next(error);
   }
})

router.post('/', async (req, res, next) => {
   try {
     const { error } = contactAddSchema.validate(req.body);
     if (error) {
       throw createError(400, error.message);
     }
     const { name, email, phone } = req.body;
     const result = await addContact(name, email, phone);
     res.status(201).json(result);
   } catch (error) {
     next(error);
   }
})

router.delete('/:contactId', async (req, res, next) => {
   try {
     const { contactId } = req.params;
     const result = await removeContact(contactId);
     if (!result) {
       throw createError(404);
     }
     res.json({ message: "Contact deleted" });
   } catch (error) {
     next(error);
   }
})

router.put('/:contactId', async (req, res, next) => {
   try {
     const { error } = contactAddSchema.validate(req.body);
     if (error) {
       throw createError(400, error.message);
     }
     const { contactId } = req.params;
     const { name, email, phone } = req.body;
     const result = await updateContactById(contactId, name, email, phone);
     if (!result) {
       throw createError(404);
     }
     res.status(200).json(result);
   } catch (error) {
     next(error);
   }
})

module.exports = router
