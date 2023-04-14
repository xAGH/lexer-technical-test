import { In, Repository } from "typeorm";
import { EmployeeModel } from "../../domain/models";
import { EmployeeRepository } from "../../domain/repositories";
import { EmployeeValue } from "../../domain/values";
import { EmployeeEntity } from "../entities";
import { PostgresDataSource } from "../../config/database.config";

export class DatabaseEmployeeRepository implements EmployeeRepository {

  private dataSource = PostgresDataSource.getRepository(EmployeeEntity);

  getOneEmployee(code: number): Promise<EmployeeValue | null> {
    return this.dataSource.findOne({where: {code}, withDeleted: false})
  }

  getManyEmployees(codes?: number[]): Promise<EmployeeValue[] | null> {
    return codes
      ? this.dataSource.find({where: {code:In(codes)}, withDeleted: false})
      : this.dataSource.find();
  }

  createEmployee(value: EmployeeModel): void {
    this.dataSource.save(value);
  }

  updateEmployee(value: EmployeeModel): void {
    this.dataSource.update(value.code, value);
  }

  deleteEmployee(code: number): void {
    this.dataSource.softDelete({code});
  }

}
