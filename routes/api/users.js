const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { SECRET_OR_KEY, JWT_EXPIRY } = require('../../config')

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const User = require('../../models/User')

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(400).json({ name: 'Name already exists' })
    }
    const newUser = new User({
      name: req.body.name,
      password: req.body.password,
    })
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err
        newUser.password = hash
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err))
      })
    })
  })
})

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const name = req.body.name
  const password = req.body.password
  User.findOne({ name }).then(user => {
    if (!user) {
      return res.status(404).json({ userNotFound: 'User not found' })
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        }
        jwt.sign(
          payload,
          SECRET_OR_KEY,
          { expiresIn: JWT_EXPIRY },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
            })
          }
        )
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: 'Password is incorrect' })
      }
    })
  })
})

router.get(
  '/currentuser',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name })
  }
)

module.exports = router
