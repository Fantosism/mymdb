require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/fullStackCapstone',
  TEST_MONGO_URI: process.env.TEST_MONGO_URI || 'mongodb://localhost/fullStackCapstone-test',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'
};