const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload, res) => {
  // console.log("Inside Generate Token");
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("token", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // prevent XXS attacks cross-site scripting attacks
    sameSite: "strict", // prevent CSRF attack cross-site request forgery attack
    secure: process.env.NODE_ENV !== "development",
  });
  // console.log("Outside Generate Token");
  return token;
};

module.exports = generateToken;
