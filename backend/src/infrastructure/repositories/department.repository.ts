import { In } from "typeorm";
import { DepartmentModel } from "../../domain/models";
import { DepartmentRepository } from "../../domain/repositories";
import { DepartmentEntity } from "../entities";
import { PostgresDataSource } from "../../config/database.config";
import { DepartmentValue } from "../../domain/values";

export class DatabaseDepartmentRepository implements DepartmentRepository {

  private dataSource = PostgresDataSource.getRepository(DepartmentEntity);

  getDepartment(code?: number[] | undefined): Promise<DepartmentModel[]> {
    return this.dataSource.find(code ? {where: {code:In(code)}, withDeleted: false} : undefined);
  }

  createDepartment(value: DepartmentValue): Promise<DepartmentModel | null> {
    return this.dataSource.save(value);
  }

  async updateDepartment(code: number, value: DepartmentValue): Promise<boolean> {
    try {
      await this.dataSource.update(code, value);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async deleteDepartment(code: number): Promise<boolean> {
    try {
      await this.dataSource.softDelete({ code });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
