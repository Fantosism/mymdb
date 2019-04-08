require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost/fullStackCapstone',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  SECRET_OR_KEY: process.env.SECRET_OR_KEY,
  TEST_MONGO_URI: process.env.TEST_MONGO_URI || 'mongodb://localhost/fullStackCapstone-test',
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: '7d',
  OMDB_KEY: process.env.OMDB_KEY,
  TMDB_KEY: process.env.TMDB_KEY,
}
