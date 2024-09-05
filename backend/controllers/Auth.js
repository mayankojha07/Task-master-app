const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/getJWT");

// Signup controller
exports.signup = async (req, res) => {
  try {
    // fetching data from req body
    const { firstName, lastName, email, password, confirmPassword, gender } =
      req.body;

    // validating the data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      return res.status(402).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // matching passwords
    if (confirmPassword !== password) {
      return res.status(403).json({
        success: false,
        message: "Password and confirmPassword don't matched",
      });
    }

    // checking if user already exists
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Register the user
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return res.status(408).json({
        success: false,
        message: "Password cannot be hashed",
      });
    }

    // save the user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
    });

    // generate JWT Token
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = generateToken(payload, res);
    user.token = token;
    user.password = undefined;

    // return response
    return res.status(200).json({
      success: true,
      message: "User registered successfully!",
      user: user,
      token,
    });
  } catch (error) {
    console.log("Error in signup controller -> ", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    // fetch data from request body
    const { email, password } = req.body;

    // validate data
    if (!email || !password) {
      return res
        .status(402)
        .json({ success: false, message: "All fields are required!" });
    }

    // check the user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    // compare the password
    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res
        .status(403)
        .json({ success: false, message: "Incorrect password" });
    }

    // generate jwt token
    const payload = {
      id: user._id,
      role: user.role,
    };
    const token = generateToken(payload, res);
    user.token = token;
    user.password = undefined;

    // return response
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("Error in login controller -> ", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};

// Logout controller
exports.logout = async (_, res) => {
  try {
    return res.cookie("token", null, { maxAge: 0 }).status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.log("Error in logout controller -> ", error);
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }
};
