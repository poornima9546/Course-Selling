// generateToken.js

const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (email) => {
    return jsonwebtoken.sign({ email }, secretKey, { expiresIn: "1d" });
};

module.exports = generateToken;
