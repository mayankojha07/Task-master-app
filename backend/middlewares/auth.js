const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized Access - Token Not Found",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access - Invalid Token",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error in auth middleware -> ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(402).json({
        success: false,
        message:
          "Unauthorized Access - This Route is protected for admin only.",
      });
    }

    next();
  } catch (error) {
    console.log("Error in isAdmin middleware -> ", error);
    return res
      .status(500)
      .json({ success: false, message: "INTERNAL SERVER ERROR" });
  }
};
