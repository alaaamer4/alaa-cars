const isAdmin = (req, res, next) => {
  if (req.user.role !== 1) {
    res.status(401).send("not authorized, admins only route");
  }
  next();
};

module.exports = isAdmin;
