const express = require('express')
const mongoose = require('mongoose')
const User = require('../../models/User')
const Movie = require('../../models/Movie')
const passport = require('passport')
const router = express.Router()

router.use('/', passport.authenticate('jwt', { session: false, failWithError: true }))

router.get('/', (req, res) => {
  const userId = req.user.id
  Movie.find({ userId })
    .sort('name')
    .then(results => res.json(results))
    .catch(err => console.log(err))
})

router.get('/favorite', (req, res) => {
  const userId = req.user.id
  Movie.find({ userId })
    .sort('name')
    .then(results => {
      console.log('results', results)
      res.json(results)
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const { movies } = req.body
  console.log('movies: ', movies)
  const userId = req.user.id
  Movie.findOneAndUpdate(
    { userId },
    { $addToSet: { movies: movies } },
    {
      upsert: true,
      new: true,
    }
  )
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.post('/favorite', (req, res) => {
  const { movies } = req.body
  console.log('movies: ', movies)
  const userId = req.user.id
  Movie.findOneAndUpdate(
    { userId },
    { $addToSet: { favorited: movies } },
    {
      upsert: true,
      new: true,
    }
  )
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const userId = req.user.id
  Movie.findOneAndDelete({ _id: id, userId })
    .then(result => res.json(result))
    .catch(err => console.log(err))
})

module.exports = router
