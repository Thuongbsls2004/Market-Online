const jwtUtils = require("../utils/jwt.util");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }

  const decoded = jwtUtils.verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      message: "Invalid Token!",
    });
  }

  req.user = decoded.data;

  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found!",
    });
  }

  next();
};
