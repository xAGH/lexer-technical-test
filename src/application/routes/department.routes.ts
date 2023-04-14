import { Router } from "express";
import { Configuration } from "../../config";
import { departmentHandlers } from "../controllers/";

export const router = Router();
const baseEndpoint =  Configuration.APP.VERSION + "/department"

router.get(`${baseEndpoint}/`, departmentHandlers.getDepartment)
router.post(`${baseEndpoint}/`, departmentHandlers.saveDepartment)
router.put(`${baseEndpoint}/:code`, departmentHandlers.updateDepartment)
router.delete(`${baseEndpoint}/:code`, departmentHandlers.deleteDepartment)
