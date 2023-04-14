import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm"
import { DepartmentModel } from "../../domain/models"
import { EmployeeEntity } from ".";

@Entity()
export class DepartmentEntity implements DepartmentModel {

  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  name: string;

  @Column()
  budget: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => EmployeeEntity, (employee) => employee.department)
  employee: EmployeeEntity[];
}
