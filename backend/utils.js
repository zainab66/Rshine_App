const jwt = require("jsonwebtoken");
require("dotenv").config();

 const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.jwtSecret || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

module.exports = generateToken;
