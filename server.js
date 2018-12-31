const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { PORT, MONGO_URI } = require('./config')

// Initialize
const app = express()

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(bodyParser.json())

// Custom 404 Not Found route handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// Custom Error Handler
app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message })
    res.status(err.status).json(errBody)
  } else {
    res.status(500).json({ message: 'Internal Server Error' })
    console.log(err.name === 'FakeError' ? '' : err)
  }
})

// Connect to MongoDB && listen for incoming connections
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

  app
    .listen(PORT, function() {
      console.info(
        `Server is connected and listening on port ${this.address().port}`
      )
    })
    .on('error', err => console.error(err))
}

module.exports = app // Export for testing
