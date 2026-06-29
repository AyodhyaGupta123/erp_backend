const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    /* =========================
       Company Information
    ========================= */

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyCode: {
      type: String,
      unique: true,
      uppercase: true,
    },

    companyPrefix: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    legalName: {
      type: String,
      required: true,
    },

    industry: {
      type: String,
      required: true,
    },

    companySize: {
      type: String,
      enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
      default: "1-10",
    },

    logo: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    /* =========================
       Registration Details
    ========================= */

    gstNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    panNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    cinNumber: {
      type: String,
      default: "",
    },

    tanNumber: {
      type: String,
      default: "",
    },

    /* =========================
       Contact Details
    ========================= */

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    alternatePhone: {
      type: String,
      default: "",
    },

    /* =========================
       Address
    ========================= */

    address: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      default: "India",
    },

    pincode: {
      type: String,
      required: true,
    },

    /* =========================
       Subscription
    ========================= */

    subscription: {
      plan: {
        type: String,
        enum: ["Trial", "Basic", "Professional", "Enterprise"],
        default: "Trial",
      },

      billingCycle: {
        type: String,
        enum: ["Monthly", "Yearly"],
        default: "Monthly",
      },

      amount: {
        type: Number,
        default: 0,
      },

      startDate: {
        type: Date,
        default: Date.now,
      },

      endDate: {
        type: Date,
      },

      maxEmployees: {
        type: Number,
        default: 25,
      },

      maxBranches: {
        type: Number,
        default: 1,
      },

      storageLimit: {
        type: Number,
        default: 5,
      },
    },

    /* =========================
       Payment Details
    ========================= */

    payment: {
      paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
      },

      paymentMethod: {
        type: String,
        enum: [
          "UPI",
          "Credit Card",
          "Debit Card",
          "Net Banking",
          "Bank Transfer",
          "Cash",
        ],
      },

      transactionId: {
        type: String,
        default: "",
      },

      invoiceNumber: {
        type: String,
        default: "",
      },

      lastPaymentDate: Date,

      nextDueDate: Date,
    },

    /* =========================
       Account Status
    ========================= */

    accountStatus: {
      type: String,
      enum: ["Active", "Inactive", "Suspended", "Expired"],
      default: "Active",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    blockedReason: {
      type: String,
      default: "",
    },

    /* =========================
       Company Settings
    ========================= */

    timezone: {
      type: String,
      default: "Asia/Kolkata",
    },

    currency: {
      type: String,
      default: "INR",
    },

    financialYear: {
      type: String,
      default: "April-March",
    },

    /* =========================
       Audit
    ========================= */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Company", companySchema);
