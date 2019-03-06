const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema(
  {
    movies: {
      type: Array,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
)

MovieSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id
    delete result.__v
  },
})

module.exports = mongoose.model('Movie', MovieSchema)
