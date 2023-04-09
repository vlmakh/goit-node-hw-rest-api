const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
      minlength: 1,
      maxlength: 30,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const userRegSchema = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const userSubsrSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  userRegSchema,
  userLoginSchema,
  userSubsrSchema,
};
