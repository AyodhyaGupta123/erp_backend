const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
{
    employeeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    employeeCode: {
        type: String,
        unique: true,
        sparse: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    officeEmail: {
        type: String,
        lowercase: true,
        trim: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    alternatePhoneNumber: String,

    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },

    dateOfBirth: {
        type: Date,
        required: true
    },

    bloodGroup: String,

    maritalStatus: {
        type: String,
        enum: ["Single", "Married", "Divorced", "Widowed"]
    },

    nationality: {
        type: String,
        default: "Indian"
    },

    fatherName: String,

    motherName: String,

    profilePicture: String,

    addressPresent: {
        type: String,
        required: true
    },

    addressPermanent: {
        type: String,
        required: true
    },

    city: String,

    state: String,

    country: {
        type: String,
        default: "India"
    },

    pincode: String,

    emergencyContactName: String,

    emergencyContactRelation: String,

    emergencyContactNumber: String,

    designation: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    employmentType: {
        type: String,
        enum: ["Permanent", "Contract", "Intern", "Freelancer"],
        default: "Permanent"
    },

    employeeStatus: {
        type: String,
        enum: [
            "Active",
            "Inactive",
            "Notice Period",
            "Resigned",
            "Terminated"
        ],
        default: "Active"
    },

    dateOfJoining: {
        type: Date,
        required: true
    },

    confirmationDate: Date,

    probationPeriod: Number,

    workLocation: String,

    shift: String,

    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    },

    projects: [
        {
            projectName: String,
            role: String,
            startDate: Date,
            endDate: Date
        }
    ],

    education: [
        {
            degree: String,
            institute: String,
            passingYear: Number,
            percentage: Number
        }
    ],

    experience: [
        {
            company: String,
            designation: String,
            from: Date,
            to: Date,
            years: Number
        }
    ],


    skills: [String],

    certifications: [String],

    languagesKnown: [String],

    ctc: Number,

    basicSalary: Number,

    hra: Number,

    allowances: Number,

    bonus: Number,

    salary: Number,

    salaryMode: {
        type: String,
        enum: ["Bank Transfer", "Cash", "Cheque", "UPI"]
    },

    bankName: String,

    bankAccountNumber: String,

    ifscCode: String,

    branchName: String,

    accountHolderName: String,

    aadhaarNumber: {
        type: String,
        unique: true,
        sparse: true
    },

    panNumber: {
        type: String,
        unique: true,
        sparse: true
    },

    uanNumber: String,

    pfNumber: String,

    esiNumber: String,

    passportNumber: String,

    drivingLicenseNumber: String,

    casualLeave: {
        type: Number,
        default: 0
    },

    sickLeave: {
        type: Number,
        default: 0
    },

    earnedLeave: {
        type: Number,
        default: 0
    },

    maternityLeave: {
        type: Number,
        default: 0
    },

    leaveBalance: {
        type: Number,
        default: 0
    },

    biometricId: String,

    attendanceEnabled: {
        type: Boolean,
        default: true
    },


    aadhaarFile: String,

    panFile: String,

    profilePictureFile: String,

    resume: String,

    offerLetter: String,

    appointmentLetter: String,

    experienceLetter: String,

    educationCertificate: String,

    cancelledCheque: String,

    kycDocument: String,

    resignationDate: Date,

    lastWorkingDay: Date,

    exitReason: String,

    remarks: String,

    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Employee", employeeSchema);