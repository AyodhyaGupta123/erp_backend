const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createCompany
} = require("../controllers/companyController");

router.post("/", protect, createCompany);

module.exports = router;