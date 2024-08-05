const jwt = require("jsonwebtoken");

module.exports = {
  generateToken: (payload, expiresIn = "7d") => {
    const token = jwt.sign(payload, process.env.SECRET_KEY_TOKEN, {
      expiresIn,
    });

    return token;
  },

  verifyToken: (token) => {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    return decoded;
  },
};
