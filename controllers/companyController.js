const Company = require("../models/Company");
const generateCompanyCode = require("../utils/generateCompanyCode");
const generateCompanyPrefix = require("../utils/generateCompanyPrefix");

/* ======================================
   Create Company
====================================== */

const createCompany = async (req, res) => {
    try {

        const {
            companyName,
            legalName,
            industry,
            companySize,
            gstNumber,
            panNumber,
            cinNumber,
            tanNumber,
            email,
            phoneNumber,
            alternatePhone,
            website,
            address,
            city,
            state,
            country,
            pincode,
            description,
            logo,
            subscription,
            payment,
            timezone,
            currency,
            financialYear
        } = req.body;

        /* ==========================
           Required Fields
        =========================== */

        if (!companyName || !email || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: "Company Name, Email and Phone Number are required."
            });
        }

        /* ==========================
           Email Check
        =========================== */

        const existingEmail = await Company.findOne({
            email,
            isDeleted: false
        });

        if (existingEmail) {
            return res.status(400).json({
                success: false,
                message: "Company email already exists."
            });
        }

        /* ==========================
           GST Check
        =========================== */

        if (gstNumber) {

            const existingGST = await Company.findOne({
                gstNumber,
                isDeleted: false
            });

            if (existingGST) {
                return res.status(400).json({
                    success: false,
                    message: "GST Number already exists."
                });
            }

        }

        /* ==========================
           PAN Check
        =========================== */

        if (panNumber) {

            const existingPAN = await Company.findOne({
                panNumber,
                isDeleted: false
            });

            if (existingPAN) {
                return res.status(400).json({
                    success: false,
                    message: "PAN Number already exists."
                });
            }

        }

        /* ==========================
           Generate Company Code
        =========================== */

        const companyCode = await generateCompanyCode();

        /* ==========================
           Generate Company Prefix
        =========================== */

        let companyPrefix = generateCompanyPrefix(companyName);

        let counter = 1;

        while (
            await Company.findOne({
                companyPrefix
            })
        ) {

            companyPrefix =
                `${generateCompanyPrefix(companyName)}${counter}`;

            counter++;

        }

        /* ==========================
           Create Company
        =========================== */

        const company = await Company.create({

            companyName,

            companyCode,

            companyPrefix,

            legalName,

            industry,

            companySize,

            gstNumber,

            panNumber,

            cinNumber,

            tanNumber,

            email,

            phoneNumber,

            alternatePhone,

            website,

            address,

            city,

            state,

            country,

            pincode,

            description,

            logo,

            subscription,

            payment,

            timezone,

            currency,

            financialYear,

            createdBy: req.user._id

        });

        return res.status(201).json({

            success: true,

            message: "Company created successfully.",

            data: company

        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Failed to create company.",

            error: error.message

        });

    }
};

module.exports = {

    createCompany

};