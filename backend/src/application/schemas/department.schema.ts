import Joi from "joi";

export const departmentSchema = Joi.object(
  {
    name: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .required(),

    budget: Joi.number()
      .positive()
      .precision(4)
      .required()
  }
).required()
