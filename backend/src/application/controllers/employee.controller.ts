import { RequestHandler } from "express"
import { DatabaseEmployeeRepository } from "../../infrastructure/repositories/employee.repository"
import { ResponseType } from "../../domain/types/response.type"
import { EmployeeModel } from "../../domain/models"
import { employeeSchema } from "../schemas"
import { log } from "console"
import { departmentExists } from "./department.controller"

const employeeService = new DatabaseEmployeeRepository()


const getEmployee: RequestHandler = async (req, res) => {
  /** Retrieving code from request parameters */
  let params = req.query.code;

  /** Validating to receive a string array */
  let codes = (Array.isArray(params) ? params : [params]) as string[];

  /** Data response object */
  let data: EmployeeModel | EmployeeModel[] | null;

  // Parsing each element of the code param to number.
  let parsedCodes: number[] = [];
  if(Array.isArray(codes)) {
    for (const num of codes) {
      if (parseInt(num)) {
        parsedCodes.push(parseInt(num));
      }
    }
  }

  /**
   * if 'codes' contains at least 1 element, the method to get employeed is called
   * sending the list. Otherwise, the method is called with undefined.
   */
  data = await employeeService.getEmployee(parsedCodes.length > 0 ? parsedCodes : undefined)

  /** Building response object */
  const response: ResponseType = new ResponseType(true, data, 'Employees found');

  return res.status(200).json(response);
}

const saveEmploye: RequestHandler = async (req, res) => {
  /** Input body validation */
  const { error, value } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).json(new ResponseType(false, error, 'Errors in the sent body.'));
  }

  /** Validating that the department exists */
  let depExists: boolean = await departmentExists(value.department);

  if (!depExists) {
    return res.status(400).json(new ResponseType(false, null, 'Specified department does not found.'));
  }

  let saved = await employeeService.createEmployee(value);

  /** Building response object */
  const response: ResponseType = new ResponseType(true, saved, 'Employee created');

  return res.status(201).json(response);
}

const updateEmployee: RequestHandler = async (req, res) => {
  /** Request param validation */
  const code = parseInt(req.params.code)
  if (code == undefined) {
    return res.status(400).json(new ResponseType(false, null, 'No code sent in url params.'));
  }

  let exists: boolean = await employeeExists(code);

  if (!exists) {
    return res.status(400).json(new ResponseType(false, null, 'Specified employee does not found.'));
  }

  /** Input body validation */
  const { error, value } = employeeSchema.validate(req.body);
  if (error) {
    return res.status(400).json(new ResponseType(false, error, 'Errors in the sent body.'));
  }

  console.log();

  let depExists: boolean = await departmentExists(value.department);

  if (!depExists) {
    return res.status(400).json(new ResponseType(false, null, 'Specified department does not found.'));
  }

  let success: boolean = await employeeService.updateEmployee(code, value)
  let response: ResponseType;

  /** Building response object */
  if(success) {
    response = new ResponseType(true, null, 'Employee updated');
  } else {
    response = new ResponseType(false, null, 'Error updating employee');
  }

  return res.status(success ? 200 : 400).json(response);
}

const deleteEmployee: RequestHandler = async (req, res) => {
  /** Request param validation */
  const code = parseInt(req.params.code)
  if (code == undefined) {
    return res.status(400).json(new ResponseType(false, null, 'No code sent in url params.'));
  }

  let exists: boolean = await employeeExists(code);

  if (!exists) {
    return res.status(400).json(new ResponseType(false, null, 'Specified employee does not found.'));
  }

  let success: boolean = await employeeService.deleteEmployee(code)
  let response: ResponseType;

  /** Building response object */
  if(success) {
    response = new ResponseType(true, null, 'Employee deleted');
  } else {
    response = new ResponseType(false, null, 'Error deleting Employee');
  }
  return res.status(200).json(response);
}

export const employeeExists = async (code: number): Promise<boolean> => {
  let employee: EmployeeModel[] = await employeeService.getEmployee([code]);
  return employee.length > 0;
}

export default {
  getEmployee,
  saveEmploye,
  updateEmployee,
  deleteEmployee
}
