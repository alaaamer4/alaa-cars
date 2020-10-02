require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // get token from header
  const token = req.cookies.x_auth_token;
  //* check if no token
  if (!token) {
    res.status(401).json({
      success: false,
      err: " authorization denied ",
    });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // save token in the user in request
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      isAuth: false,
      err: "invalid token , authorization denied",
    });
  }
};
