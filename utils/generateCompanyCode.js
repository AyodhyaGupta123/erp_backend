const Company = require("../models/Company");

const generateCompanyCode = async () => {

    const lastCompany = await Company.findOne()
        .sort({ createdAt: -1 });

    if (!lastCompany || !lastCompany.companyCode) {
        return "COMP0001";
    }

    const lastNumber = parseInt(
        lastCompany.companyCode.replace("COMP", ""),
        10
    );

    const nextNumber = lastNumber + 1;

    return `COMP${String(nextNumber).padStart(4, "0")}`;
};

module.exports = generateCompanyCode;