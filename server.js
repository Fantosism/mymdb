const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const { PORT, MONGO_URI, CLIENT_ORIGIN } = require('./config')
const cors = require('cors')
const users = require('./routes/api/users')
const search = require('./routes/api/search')
const movie = require('./routes/api/movie')

const app = express()

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())

app.use(
  cors({
    origin: CLIENT_ORIGIN,
  })
)

if (require.main === module) {
  mongoose
    .connect(
      MONGO_URI,
      { useNewUrlParser: true }
    )
    .then(instance => {
      const conn = instance.connections[0]
      console.log(
        `Connected to: mongodb://${conn.host}:${conn.port}/${conn.name}`
      )
    })
    .catch(err => console.log(err))

  app.use(passport.initialize())

  require('./passport')(passport)

  app.use('/api/users', users)
  app.use('/api/search', search)
  app.use('/api/movie', movie)

  app
    .listen(PORT, function() {
      console.info(
        `Server is connected and listening on port ${this.address().port}`
      )
    })
    .on('error', err => console.error(err))
}

module.exports = app
