import Joi from "joi";
import { departmentSchema } from "./department.schema";

export const employeeSchema = Joi.object(
  {
    nif: Joi.string()
      .trim()
      .length(10)
      .required(),

    name: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .required(),

    lastname1: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .required(),

    lastname2: Joi.string()
      .min(2)
      .max(100)
      .trim()
      .required(),

    department: Joi.number()
      .min(1)
      .required(),
  }
)
