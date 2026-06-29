const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    /* =========================
       COMPANY INFO
    ========================= */

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null, // SuperAdmin ke liye null
    },

    /* =========================
       BASIC INFO
    ========================= */

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      default: "",
    },

    profileImage: {
      type: String,
      default: "",
    },

    /* =========================
       ERP ROLE SYSTEM
    ========================= */

    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },

    /* =========================
       EMPLOYEE INFO (OPTIONAL)
    ========================= */

    employeeCode: {
      type: String,
      unique: true,
      sparse: true,
    },

    designation: {
      type: String,
      default: "",
    },

    department: {
      type: String,
      default: "",
    },

    /* =========================
       ACCOUNT STATUS
    ========================= */

    accountStatus: {
      type: String,
      enum: ["Active", "Inactive", "Blocked"],
      default: "Active",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    /* =========================
       SECURITY
    ========================= */

    lastLogin: {
      type: Date,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },

    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   AUTO FULL NAME
========================= */

userSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.lastName}`;
  next();
});

module.exports = mongoose.model("User", userSchema);