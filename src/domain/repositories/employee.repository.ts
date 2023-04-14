import { EmployeeModel } from "../models";
import { EmployeeValue } from "../values";

export interface EmployeeRepository {

  getEmployee(code?: number[]): Promise<EmployeeModel[]>;
  createEmployee(value: EmployeeValue): Promise<EmployeeModel | null>;
  updateEmployee(code: number, value: EmployeeValue): Promise<boolean>;
  deleteEmployee(code: number): Promise<boolean>;

}
