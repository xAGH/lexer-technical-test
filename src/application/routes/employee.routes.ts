import { Router } from "express";
import { Configuration } from "../../config";
import { employeeHandlers } from "../controllers/";

export const router = Router();
const baseEndpoint =  Configuration.APP.VERSION + "/employee"

router.get(`${baseEndpoint}/`, employeeHandlers.getEmployee)
router.post(`${baseEndpoint}/`, employeeHandlers.saveEmploye)
router.put(`${baseEndpoint}/:code`, employeeHandlers.updateEmployee)
router.delete(`${baseEndpoint}/:code`, employeeHandlers.deleteEmployee)
