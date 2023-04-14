import { BaseModel, DepartmentModel } from "./";

export interface EmployeeModel extends BaseModel {

  nif: string;
  name: string;
  lastname1: string;
  lastname2: string;
  department: DepartmentModel;

};
