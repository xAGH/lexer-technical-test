import { EmployeeModel } from "../models";
import { EmployeeValue } from "../values";

export interface EmployeeRepository {

  getOneEmployee(code: number): Promise<EmployeeValue | null>;
  getManyEmployees(codes?: number[]): Promise<EmployeeValue[] | null>;
  createEmployee(value: EmployeeModel): void;
  updateEmployee(value: EmployeeModel): void;
  deleteEmployee(code: number): void;

}
