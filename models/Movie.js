const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create UserSchema to be used for Registration
const MovieSchema = new Schema({
  movies: {
    type: Array,
    // required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}},
    {timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }}
)

MovieSchema.set('toJSON', {
  virtuals: true,
  transform: (doc,result) => {
    delete result._id
    delete result.__v
  }
})

module.exports = mongoose.model('Movie', MovieSchema)
