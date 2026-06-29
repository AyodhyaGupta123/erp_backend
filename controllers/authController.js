const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { loginId, password } = req.body;

    // 1. Find user (email or employeeCode)
    const user = await User.findOne({
      $or: [
        { email: loginId },
        { employeeCode: loginId },
      ],
    }).populate("roleId");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3. Generate token
    const token = generateToken(user._id);

    // 4. Update last login
    user.lastLogin = new Date();
    await user.save();

    // 5. Response
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        companyId: user.companyId,
        role: user.roleId.roleName,
        permissions: user.roleId.permissions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};