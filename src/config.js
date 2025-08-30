require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  DOMAIN: process.env.DOMAIN || "ecell.iitm.ac.in", // Your stable domain
};
