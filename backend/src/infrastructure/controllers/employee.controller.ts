import { Router } from "express";
import { EmployeeEntity } from "../entities";
import { PostgresDataSource } from "../../config/database.config";
import { DepartmentValue, EmployeeValue } from "../../domain/values";

export const router = Router()

router.get("/", async (req, res) => {
  let e = await PostgresDataSource.getRepository(EmployeeEntity).find();
  res.status(200).json(e)
})

router.get("/create", async (req, res)=> {

  let dep: DepartmentValue = new DepartmentValue("IT", 5000)

  let user: EmployeeValue = new EmployeeValue(
    "John Doe",
    "John",
    "Doe",
    "1232323",
    dep
  )
  let e = await PostgresDataSource.getRepository(EmployeeEntity).save(user);
  res.status(200).json(e)
})

router.get("/delete", async (req, res)=> {
  let e = await PostgresDataSource.getRepository(EmployeeEntity).softDelete(1);
  res.status(200).json(e)
})
