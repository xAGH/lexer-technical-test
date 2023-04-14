import { DepartmentModel } from "../models";
import { DepartmentValue } from "../values";

export interface DepartmentRepository {
  getDepartment(code?: number[]): Promise<DepartmentModel[]>;
  createDepartment(value: DepartmentValue): Promise<DepartmentModel | null>;
  updateDepartment(code: number, value: DepartmentValue): Promise<boolean>;
  deleteDepartment(code: number): Promise<boolean>;
}
