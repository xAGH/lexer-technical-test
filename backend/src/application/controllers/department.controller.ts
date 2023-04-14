import { RequestHandler } from "express"
import { DatabaseDepartmentRepository } from "../../infrastructure/repositories/department.repository"
import { ResponseType } from "../../domain/types/response.type"
import { DepartmentModel } from "../../domain/models"
import { departmentSchema } from "../schemas"

const departmentService = new DatabaseDepartmentRepository()

const getDepartment: RequestHandler = async (req, res) => {
  /** Retrieving code from request parameters */
  let params = req.query.code;

  /** Validating to receive a string array */
  let codes = (Array.isArray(params) ? params : [params]) as string[];

  /** Data response object */
  let data: DepartmentModel | DepartmentModel[] | null;

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
   * if 'codes' contains at least 1 element, the method to get Departmentd is called
   * sending the list. Otherwise, the method is called with undefined.
   */
  data = await departmentService.getDepartment(parsedCodes.length > 0 ? parsedCodes : undefined)

  /** Building response object */
  const response: ResponseType = new ResponseType(true, data, 'Departments found');

  return res.status(200).json(response);
}

const saveDepartment: RequestHandler = async (req, res) => {
  /** Input body validation */
  const { error, value } = departmentSchema.validate(req.body);
  if (error) {
    return res.status(400).json(new ResponseType(false, error, 'Errors in the sent body.'));
  }

  let saved = await departmentService.createDepartment(value);

  /** Building response object */
  const response: ResponseType = new ResponseType(true, saved, 'Department created');

  return res.status(201).json(response);
}

const updateDepartment: RequestHandler = async (req, res) => {
  /** Request param validation */
  const code = parseInt(req.params.code)
  if (code == undefined) {
    return res.status(400).json(new ResponseType(false, null, 'No code sent in url params.'));
  }

  let exists: boolean = await departmentExists(code);

  if (!exists) {
    return res.status(400).json(new ResponseType(false, null, 'Specified employee does not found.'));
  }

  /** Input body validation */
  const { error, value } = departmentSchema.validate(req.body);
  if (error) {
    return res.status(400).json(new ResponseType(false, error, 'Errors in the sent body.'));
  }

  (value as DepartmentModel).code = code;

  let success: boolean = await departmentService.updateDepartment(code, value)
  let response: ResponseType;

  /** Building response object */
  if(success) {
    response = new ResponseType(true, null, 'Department updated');
  } else {
    response = new ResponseType(false, null, 'Error updating Department');
  }

  return res.status(success ? 200 : 400).json(response);
}

const deleteDepartment: RequestHandler = async (req, res) => {
  /** Request param validation */
  const code = parseInt(req.params.code)
  if (code == undefined) {
    return res.status(400).json(new ResponseType(false, null, 'No code sent in url params.'));
  }

  let exists: boolean = await departmentExists(code);

  if (!exists) {
    return res.status(400).json(new ResponseType(false, null, 'Specified employee does not found.'));
  }

  let success: boolean = await departmentService.deleteDepartment(code)
  let response: ResponseType;

  /** Building response object */
  if(success) {
    response = new ResponseType(true, null, 'Department deleted');
  } else {
    response = new ResponseType(false, null, 'Error deleting Department');
  }

  return res.status(200).json(response);
}

export const departmentExists = async (code: number): Promise<boolean> => {
  let department: DepartmentModel[] = await departmentService.getDepartment([code]);
  return department.length > 0;
}

export default {
  getDepartment,
  saveDepartment,
  updateDepartment,
  deleteDepartment
}
