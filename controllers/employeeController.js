const Employee = require("../models/Employee");
const generateEmployeeCode = require("../utils/generateEmployeeCode");


const createEmployee = async (req, res) => {

    try {

        const {
            companyId,
            personalEmail,
            officeEmail,
            phoneNumber
        } = req.body;

        if (!companyId) {

            return res.status(400).json({
                success: false,
                message: "Company ID is required."
            });

        }

        /* ===============================
           Personal Email Check
        =============================== */

        if (personalEmail) {

            const emailExists = await Employee.findOne({
                personalEmail,
                isDeleted: false
            });

            if (emailExists) {

                return res.status(400).json({
                    success: false,
                    message: "Personal Email already exists."
                });

            }

        }

        /* ===============================
           Office Email Check
        =============================== */

        if (officeEmail) {

            const officeExists = await Employee.findOne({
                officeEmail,
                isDeleted: false
            });

            if (officeExists) {

                return res.status(400).json({
                    success: false,
                    message: "Office Email already exists."
                });

            }

        }

        /* ===============================
           Phone Check
        =============================== */

        const phoneExists = await Employee.findOne({
            phoneNumber,
            isDeleted: false
        });

        if (phoneExists) {

            return res.status(400).json({
                success: false,
                message: "Phone Number already exists."
            });

        }

        /* ===============================
           Generate Employee Code
        =============================== */

        const employeeCode = await generateEmployeeCode(companyId);

        /* ===============================
           Create Employee
        =============================== */

        const employee = await Employee.create({

            ...req.body,

            employeeCode,

            createdBy: req.user._id

        });

        return res.status(201).json({

            success: true,

            message: "Employee created successfully.",

            data: employee

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Error creating employee.",

            error: error.message

        });

    }

};

/**
 * Get All Employees
 */

const getAllEmployees = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";
        const department = req.query.department;
        const status = req.query.status;

        let filter = {
            isActive: true
        };

        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" } },
                { employeeId: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { phoneNumber: { $regex: search, $options: "i" } }
            ];
        }

        if (department) {
            filter.department = department;
        }

        if (status) {
            filter.employeeStatus = status;
        }

        const employees = await Employee.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Employee.countDocuments(filter);

        return res.status(200).json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            totalEmployees: total,
            data: employees
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * Get Employee By ID
 */

const getEmployeeById = async (req, res) => {

    try {

        const employee = await Employee.findById(req.params.id);

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });

        }

        return res.status(200).json({
            success: true,
            data: employee
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * Update Employee
 */

const updateEmployee = async (req, res) => {

    try {

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully.",
            data: employee
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * Soft Delete Employee
 */

const deleteEmployee = async (req, res) => {

    try {

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            {
                isActive: false,
                employeeStatus: "Inactive"
            },
            {
                new: true
            }
        );

        if (!employee) {

            return res.status(404).json({
                success: false,
                message: "Employee not found."
            });

        }

        return res.status(200).json({
            success: true,
            message: "Employee deleted successfully."
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * Active Employees
 */

const getActiveEmployees = async (req, res) => {

    try {

        const employees = await Employee.find({
            isActive: true
        });

        return res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * Department Wise Employees
 */

const getEmployeesByDepartment = async (req, res) => {

    try {

        const employees = await Employee.find({
            department: req.params.department,
            isActive: true
        });

        return res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * Status Wise Employees
 */

const getEmployeesByStatus = async (req, res) => {

    try {

        const employees = await Employee.find({
            employeeStatus: req.params.status
        });

        return res.status(200).json({
            success: true,
            count: employees.length,
            data: employees
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {

    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getActiveEmployees,
    getEmployeesByDepartment,
    getEmployeesByStatus

};