const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

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

router.post("/", protect, createEmployee);

router.get("/", protect, getAllEmployees);

router.get("/active", protect, getActiveEmployees);

router.get("/department/:department", protect, getEmployeesByDepartment);

router.get("/status/:status", protect, getEmployeesByStatus);

router.get("/:id", protect, getEmployeeById);

router.put("/:id", protect, updateEmployee);

router.delete("/:id", protect, deleteEmployee);

module.exports = router;