import { In } from "typeorm";
import { EmployeeModel } from "../../domain/models";
import { EmployeeRepository } from "../../domain/repositories";
import { EmployeeEntity } from "../entities";
import { PostgresDataSource } from "../../config/database.config";
import { EmployeeValue } from "../../domain/values";

export class DatabaseEmployeeRepository implements EmployeeRepository {

  private dataSource = PostgresDataSource.getRepository(EmployeeEntity);

  getEmployee(code?: number[] | undefined): Promise<EmployeeModel[]> {
    return this.dataSource.find(code ? {where: {code:In(code)}, withDeleted: false} : undefined);
  }

  createEmployee(value: EmployeeValue): Promise<EmployeeModel | null> {
    return this.dataSource.save(value);
  }

  async updateEmployee(code: number, value: EmployeeModel): Promise<boolean> {
    try {
      await this.dataSource.update(code, value);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async deleteEmployee(code: number): Promise<boolean> {
    try {
      await this.dataSource.softDelete({ code });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

}
