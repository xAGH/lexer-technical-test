import { DepartmentModel } from "../models";
import { BaseValue } from "./base.value";

export class DepartmentValue extends BaseValue implements DepartmentModel{

  name: string;
  budget: number;

  constructor(
    name: string,
    budget: number
  ) {
    super();
    this.name = name;
    this.budget = budget;
  }

}
