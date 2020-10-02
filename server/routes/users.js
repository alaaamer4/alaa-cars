const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
require("dotenv").config();
const { User } = require("../models/User");

// route   => /api/users/register
// method    => POST
// access    => public
router.post("/register", async (req, res) => {
  const user = new User(req.body);
  //* hashing the password
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  await user.save((err, doc) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

// route   => /api/users/login
// method    => POST
// access    => public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // find user by email
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found, invalid email" });
    // compare password
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res
        .status(400)
        .json({ success: false, message: "invalid password" });
    }
    // generate jwt
    const payload = {
      id: user.id,
    };
    jwt.sign(payload, process.env.JWT_SECRET, async (err, token) => {
      if (err) throw err;
      user.token = token;
      await user.save();
      res
        .cookie("x_auth_token", token)
        .status(200)
        .json({ success: true, message: token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, err: "server error" });
  }
});

// route   => /api/users/auth
// method    => POST
// access    => private  level 0
router.get("/auth", auth, async (req, res) => {
  const user = await User.findById(req.user.id)
    .select("-password")
    .select("-token");
  res.status(200).json({
    isAdmin: req.user.role === 1 ? true : false,
    isAuth: true,
    user,
  });
});
// route   => /api/users/logout
// method    => POST
// access    => private  level 0
router.get("/logout", auth, (req, res) => {
  User.findByIdAndUpdate({ _id: req.user.id }, { token: "" }, (err, doc) => {
    if (err) {
      res.status(400).json({ success: false, err });
    }

    return res.cookie("x_auth_token", "").status(200).json({ success: true });
  });
});
module.exports = router;
