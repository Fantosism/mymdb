const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create UserSchema to be used for Registration
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
  
})

module.exports = mongoose.model('User', UserSchema)