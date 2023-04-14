import { DepartmentModel } from "../models";
import { EmployeeModel } from "../models/employee.model";
import { BaseValue } from "./base.value";

export class EmployeeValue extends BaseValue implements EmployeeModel{

  nif: string;
  name: string;
  lastname1: string
  lastname2: string
  department: DepartmentModel;

  constructor(
    nif: string,
    name: string,
    lastname1: string,
    lastname2: string,
    department: DepartmentModel
  ) {
    super();
    this.nif = nif;
    this.name = name;
    this.lastname1 = lastname1;
    this.lastname2 = lastname2;
    this.department = department;
  }

}
