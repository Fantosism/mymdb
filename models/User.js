const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
})

UserSchema.set('timestamps', true)

UserSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id
    delete result.__v
  },
})

module.exports = mongoose.model('User', UserSchema)
