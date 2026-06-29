const express = require("express");
const router = express.Router();

const { login } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

router.post("/login", login);

// test route
router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;