function requireRole(roles) {
  return (req, res, next) => {
    // You need to store role in session or token
    const user = req.session?.user;
    if (!user) return res.status(401).send("Login required");
    if (!roles.includes(user.role))
      return res.status(403).send("Access denied");
    next();
  };
}

module.exports = requireRole;
