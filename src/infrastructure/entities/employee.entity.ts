import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { EmployeeModel } from "../../domain/models"
import { DepartmentEntity } from "."

@Entity()
export class EmployeeEntity implements EmployeeModel {

  @PrimaryGeneratedColumn()
  code: number;

  @Column()
  nif: string;

  @Column()
  name: string;

  @Column()
  lastname1: string;

  @Column()
  lastname2: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => DepartmentEntity, (department) => department.employee)
  department: DepartmentEntity;
}
