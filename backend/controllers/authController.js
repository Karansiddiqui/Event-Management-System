// backend/controllers/authController.js
const User = require('../models/User.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorMiddleware = require('../middleware/errorMiddleware.js');

// Sign Up
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username == "" ||
    email == "" ||
    password == ""
  ) {
    next(errorHandler(400, "All filled are required"));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }



  const newUser = new User({
    username,
    email,
    password,
  });

  try {
    await newUser.save();
    res.json("Signup successful");
  } catch (err) {
    next(err);
  }
};

// Sign In
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email == "" || password == "") {
    next(errorMiddleware(400, "All filled are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorMiddleware(401, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    console.log(validPassword);
    if (!validPassword) {
      return next(errorMiddleware(401, "Invalid password"));
    }

    const { password: pass, ...rest } = validUser._doc;

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      })
      .json(rest);
  } catch (err) {
    next(errorMiddleware(err));
 }
};

exports.signout = async (req, res,next) => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
}