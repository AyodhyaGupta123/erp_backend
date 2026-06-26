require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db")
const employeeRoutes = require("./routes/employeeRoutes");
const app = express();


connectDB ();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee ERP API Running Successfully 🚀"
    });
});

app.use("/api/employees", employeeRoutes);


app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});


app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: err.message
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});