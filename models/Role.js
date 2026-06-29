const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    /* =========================
       Company Information
    ========================= */

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      default: null, // null = System Role (SuperAdmin)
    },

    /* =========================
       Role Information
    ========================= */

    roleName: {
      type: String,
      required: true,
      trim: true,
    },

    displayName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    /* =========================
       Permissions
    ========================= */

    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Permission",
      },
    ],

    /* =========================
       Role Type
    ========================= */

    roleType: {
      type: String,
      enum: ["System", "Company", "Custom"],
      default: "Company",
    },

    /* =========================
       Default Role
    ========================= */

    isDefault: {
      type: Boolean,
      default: false,
    },

    /* =========================
       Account Status
    ========================= */

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },

    /* =========================
       Audit
    ========================= */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    /* =========================
       Soft Delete
    ========================= */

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/* ===========================================
   Unique Role Name Per Company
=========================================== */

roleSchema.index(
  {
    companyId: 1,
    roleName: 1,
  },
  {
    unique: true,
  }
);

module.exports = mongoose.model("Role", roleSchema);