const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    /* =====================================
       Company Details
    ====================================== */

    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    employeeCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    /* =====================================
       Personal Information
    ====================================== */

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    middleName: {
      type: String,
      trim: true,
      default: "",
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

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    maritalStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Widowed"],
      default: "Single",
    },

    nationality: {
      type: String,
      default: "Indian",
    },

    profilePicture: {
      type: String,
      default: "",
    },

    /* =====================================
       Family Information
    ====================================== */

    fatherName: {
      type: String,
      default: "",
    },

    motherName: {
      type: String,
      default: "",
    },

    spouseName: {
      type: String,
      default: "",
    },

    /* =====================================
       Contact Details
    ====================================== */

    personalEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    officeEmail: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },

    alternatePhoneNumber: {
      type: String,
      default: "",
    },

    emergencyContact: {
      name: String,

      relation: String,

      phone: String,
    },

    /* =====================================
       Address
    ====================================== */

    presentAddress: {
      address: String,

      city: String,

      state: String,

      country: {
        type: String,
        default: "India",
      },

      pincode: String,
    },

    permanentAddress: {
      address: String,

      city: String,

      state: String,

      country: {
        type: String,
        default: "India",
      },

      pincode: String,
    },

    /* =====================================
    Education
    ===================================== */

    education: [
      {
        degree: {
          type: String,
          required: true,
        },

        specialization: {
          type: String,
          default: "",
        },

        institute: {
          type: String,
          required: true,
        },

        university: {
          type: String,
          default: "",
        },

        passingYear: {
          type: Number,
          required: true,
        },

        percentage: {
          type: Number,
          default: 0,
        },

        grade: {
          type: String,
          default: "",
        },
      },
    ],

    /* =====================================
    Previous Experience
    ===================================== */

    experience: [
      {
        companyName: {
          type: String,
          required: true,
        },

        designation: {
          type: String,
          required: true,
        },

        employmentType: {
          type: String,
          default: "",
        },

        fromDate: {
          type: Date,
        },

        toDate: {
          type: Date,
        },

        totalExperience: {
          type: Number,
          default: 0,
        },

        currentCTC: {
          type: Number,
          default: 0,
        },

        reasonForLeaving: {
          type: String,
          default: "",
        },
      },
    ],

    /* =====================================
    Skills
    ===================================== */

    technicalSkills: [
      {
        type: String,
      },
    ],

    softSkills: [
      {
        type: String,
      },
    ],

    /* =====================================
    Certifications
    ===================================== */

    certifications: [
      {
        certificationName: String,

        issuedBy: String,

        issueDate: Date,

        expiryDate: Date,

        certificateNumber: String,
      },
    ],

    /* =====================================
    Languages
    ===================================== */

    languagesKnown: [
      {
        language: String,

        read: {
          type: Boolean,
          default: true,
        },

        write: {
          type: Boolean,
          default: true,
        },

        speak: {
          type: Boolean,
          default: true,
        },
      },
    ],

    /* =====================================
    Projects
    ===================================== */

    projects: [
      {
        projectName: {
          type: String,
        },

        clientName: {
          type: String,
        },

        role: {
          type: String,
        },

        technology: {
          type: String,
        },

        startDate: Date,

        endDate: Date,

        projectStatus: {
          type: String,
          enum: ["Running", "Completed", "On Hold"],
          default: "Running",
        },
      },
    ],

    /* =====================================
    Professional Information
    ===================================== */

    totalExperience: {
      type: Number,
      default: 0,
    },

    noticePeriod: {
      type: Number,
      default: 30,
    },

    linkedinProfile: {
      type: String,
      default: "",
    },

    githubProfile: {
      type: String,
      default: "",
    },

    portfolioWebsite: {
      type: String,
      default: "",
    },

    /* =====================================
    Salary Information
    ===================================== */

    salary: {
      ctc: {
        type: Number,
        default: 0,
      },

      basicSalary: {
        type: Number,
        default: 0,
      },

      hra: {
        type: Number,
        default: 0,
      },

      specialAllowance: {
        type: Number,
        default: 0,
      },

      conveyanceAllowance: {
        type: Number,
        default: 0,
      },

      medicalAllowance: {
        type: Number,
        default: 0,
      },

      otherAllowance: {
        type: Number,
        default: 0,
      },

      bonus: {
        type: Number,
        default: 0,
      },

      grossSalary: {
        type: Number,
        default: 0,
      },

      netSalary: {
        type: Number,
        default: 0,
      },

      salaryMode: {
        type: String,
        enum: ["Bank Transfer", "Cash", "Cheque", "UPI"],
        default: "Bank Transfer",
      },
    },

    /* =====================================
    Bank Details
    ===================================== */

    bankDetails: {
      bankName: String,

      accountHolderName: String,

      accountNumber: {
        type: String,
        unique: true,
        sparse: true,
      },

      ifscCode: String,

      branchName: String,

      accountType: {
        type: String,
        enum: ["Savings", "Current"],
        default: "Savings",
      },
    },

    /* =====================================
    Government Compliance
    ===================================== */

    governmentIds: {
      aadhaarNumber: {
        type: String,
        unique: true,
        sparse: true,
      },

      panNumber: {
        type: String,
        unique: true,
        sparse: true,
        uppercase: true,
      },

      uanNumber: {
        type: String,
        default: "",
      },

      pfNumber: {
        type: String,
        default: "",
      },

      esiNumber: {
        type: String,
        default: "",
      },

      passportNumber: {
        type: String,
        default: "",
      },

      drivingLicenseNumber: {
        type: String,
        default: "",
      },
    },

    /* =====================================
    Payroll Settings
    ===================================== */

    payroll: {
      pfApplicable: {
        type: Boolean,
        default: true,
      },

      esiApplicable: {
        type: Boolean,
        default: false,
      },

      tdsApplicable: {
        type: Boolean,
        default: true,
      },

      professionalTaxApplicable: {
        type: Boolean,
        default: true,
      },

      gratuityApplicable: {
        type: Boolean,
        default: true,
      },
    },

    /* =====================================
    Tax Details
    ===================================== */

    taxDetails: {
      panVerified: {
        type: Boolean,
        default: false,
      },

      aadhaarVerified: {
        type: Boolean,
        default: false,
      },

      taxRegime: {
        type: String,
        enum: ["Old", "New"],
        default: "New",
      },
    },

    /* =====================================
       Employment
    ====================================== */

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    employmentType: {
      type: String,

      enum: ["Permanent", "Contract", "Intern", "Consultant", "Freelancer"],

      default: "Permanent",
    },

    employeeStatus: {
      type: String,

      enum: ["Active", "Inactive", "Notice Period", "Resigned", "Terminated"],

      default: "Active",
    },

    dateOfJoining: {
      type: Date,
      required: true,
    },

    confirmationDate: Date,

    probationPeriod: {
      type: Number,
      default: 6,
    },

    workLocation: String,

    shift: String,

    reportingManager: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Employee",
    },

    /* =====================================
       Settings
    ====================================== */

    attendanceEnabled: {
      type: Boolean,

      default: true,
    },

    biometricId: String,

    /* =====================================
       Status
    ====================================== */

    isActive: {
      type: Boolean,

      default: true,
    },

    isDeleted: {
      type: Boolean,

      default: false,
    },

    /* =====================================
    Leave Management
    ===================================== */

    leaveBalance: {
      casualLeave: {
        type: Number,
        default: 12,
      },

      sickLeave: {
        type: Number,
        default: 12,
      },

      earnedLeave: {
        type: Number,
        default: 15,
      },

      maternityLeave: {
        type: Number,
        default: 180,
      },

      paternityLeave: {
        type: Number,
        default: 15,
      },

      unpaidLeave: {
        type: Number,
        default: 0,
      },
    },

    /* =====================================
    Documents
    ===================================== */

    documents: {
      profilePhoto: {
        type: String,
        default: "",
      },

      resume: {
        type: String,
        default: "",
      },

      aadhaarCard: {
        type: String,
        default: "",
      },

      panCard: {
        type: String,
        default: "",
      },

      passport: {
        type: String,
        default: "",
      },

      drivingLicense: {
        type: String,
        default: "",
      },

      educationCertificates: [
        {
          type: String,
        },
      ],

      experienceCertificates: [
        {
          type: String,
        },
      ],

      salarySlips: [
        {
          type: String,
        },
      ],

      offerLetter: {
        type: String,
        default: "",
      },

      appointmentLetter: {
        type: String,
        default: "",
      },

      incrementLetters: [
        {
          type: String,
        },
      ],

      relievingLetter: {
        type: String,
        default: "",
      },

      idProof: {
        type: String,
        default: "",
      },

      addressProof: {
        type: String,
        default: "",
      },

      cancelledCheque: {
        type: String,
        default: "",
      },
    },

    /* =====================================
    Attendance
    ===================================== */

    attendance: {
      biometricId: String,

      attendanceEnabled: {
        type: Boolean,
        default: true,
      },

      shiftName: {
        type: String,
        default: "General",
      },
    },

    /* =====================================
    Exit Details
    ===================================== */

    exitDetails: {
      resignationDate: Date,

      lastWorkingDay: Date,

      exitReason: String,

      exitInterview: String,

      finalSettlementDone: {
        type: Boolean,
        default: false,
      },
    },

    /* =====================================
    Audit
    ===================================== */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SuperAdmin",
    },

    deletedAt: Date,

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

employeeSchema.pre("save", function (next) {
  this.fullName = [this.firstName, this.middleName, this.lastName]
    .filter(Boolean)
    .join(" ");

  next();
});

employeeSchema.index(
  {
    companyId: 1,
    employeeCode: 1,
  },
  { unique: true },
);

employeeSchema.index({
  companyId: 1,
  personalEmail: 1,
});

employeeSchema.index({
  companyId: 1,
  phoneNumber: 1,
});

employeeSchema.index({
  companyId: 1,
  department: 1,
});

employeeSchema.index({
  companyId: 1,
  designation: 1,
});

employeeSchema.index({
  companyId: 1,
  employeeStatus: 1,
});

module.exports = mongoose.model("Employee", employeeSchema);
