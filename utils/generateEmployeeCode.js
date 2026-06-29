const Employee = require("../models/Employee");
const Company = require("../models/Company");

const generateEmployeeCode = async (companyId) => {

    const company = await Company.findById(companyId);

    if (!company) {
        throw new Error("Company not found.");
    }

    const prefix = company.companyPrefix;

    // Find last employee of this company
    const lastEmployee = await Employee.findOne({ companyId })
        .sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastEmployee && lastEmployee.employeeCode) {

        const codeParts = lastEmployee.employeeCode.split("-");

        if (codeParts.length === 2) {
            nextNumber = parseInt(codeParts[1], 10) + 1;
        }
    }

    return `${prefix}-${String(nextNumber).padStart(5, "0")}`;
};

module.exports = generateEmployeeCode;