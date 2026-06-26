const express = require("express");

const router = express.Router();

const {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getActiveEmployees,
    getEmployeesByDepartment,
    getEmployeesByStatus
} = require("../controllers/employeeController");

router.post("/", createEmployee);

router.get("/", getAllEmployees);

router.get("/active", getActiveEmployees);

router.get("/department/:department", getEmployeesByDepartment);

router.get("/status/:status", getEmployeesByStatus);

router.get("/:id", getEmployeeById);

router.put("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

module.exports = router;