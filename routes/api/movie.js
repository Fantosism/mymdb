const express = require('express');
const mongoose = require('mongoose');
const User = require('../../models/User')
const Movie = require('../../models/Movie')
const passport = require('passport')
const router = express.Router()

router.use('/', passport.authenticate('jwt', {session: false, failWithError: true }))

router.get('/', (req, res) => {
  const userId = req.user.id
  Movie.find({userId}).sort('name').then(results => res.json(results)).catch(err => console.log(err))
})

router.post('/', (req,res) => {
  const { movies } = req.body
  console.log(movies)
  const userId = req.user.id
  // userId = "5c2a87b9940c101fa801dda7"
  // movies = [{Movie: 'Movie 1', Title: 'Title 2' },{Movie: 'Movie 2', Title: 'Title 2'}]
  const newMovie = { movies, userId }
  Movie.create(newMovie).then(result => res.json(result)).catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  // const id = ObjectId("5c37dd0baf976d39b022d516")
  const userId = req.user.id
  // userId = "5c2a87b9940c101fa801dda7"
  Movie.findOneAndDelete({_id: id, userId}).then(result => res.json(result)).catch(err => console.log(err))
}) 


module.exports = router