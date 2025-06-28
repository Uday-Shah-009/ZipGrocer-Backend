export const userRoleAuth = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
     return res
        .status(401)
        .json({ status: false, message: "Access Denied RBAC Failed!!" });
    }
    next();
  };
};
