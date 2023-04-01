const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string(),
  phone: Joi.string(),
  email: Joi.string().email(),
});

module.exports = { contactAddSchema, contactUpdateSchema };
