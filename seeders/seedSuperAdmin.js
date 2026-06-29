const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcryptjs");

const createSuperAdmin = async () => {
  try {
    // 1. Check SuperAdmin role
    let role = await Role.findOne({ roleName: "SuperAdmin" });

    if (!role) {
      role = await Role.create({
        roleName: "SuperAdmin",
        displayName: "Super Admin",   // ✅ FIX HERE
        description: "System Super Administrator",
        companyId: null,
        roleType: "System",
        permissions: [],
        isDefault: true
      });
    }

    // 2. Check SuperAdmin user
    const exists = await User.findOne({ email: "admin@erp.com" });

    if (exists) {
      console.log("SuperAdmin already exists");
      return;
    }

    // 3. Create SuperAdmin user
    const hashedPassword = await bcrypt.hash("admin@123", 10);

    await User.create({
      firstName: "System",
      lastName: "Admin",
      email: "admin@erp.com",
      password: hashedPassword,
      phoneNumber: "9999999999",
      roleId: role._id,
      companyId: null,
      accountStatus: "Active",
      isVerified: true
    });

    console.log("SuperAdmin created successfully");
  } catch (err) {
    console.log("Seeder Error:", err);
  }
};

module.exports = createSuperAdmin;