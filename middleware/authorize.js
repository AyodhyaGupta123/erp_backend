const authorize = (...allowedPermissions) => {
  return (req, res, next) => {
    try {
      const role = req.user.roleId;

      const userPermissions = role.permissions.map((p) =>
        p.toString()
      );

      const hasPermission = allowedPermissions.some((perm) =>
        userPermissions.includes(perm)
      );

      if (!hasPermission) {
        return res.status(403).json({
          success: false,
          message: "Access denied (Permission missing)",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Authorization error",
      });
    }
  };
};

module.exports = authorize;