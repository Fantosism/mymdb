// Load dependencies
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const { SECRET_OR_KEY, JWT_EXPIRY } = require('../../config')

// Load input validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// Load User model
const User = require('../../models/User')

// Register an account
router.post('/register', (req, res) => {
  // Pull errors and isValid from validateRegisterInput(request.body) & check validation
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }
  // If valid, use MongoDB to see if the user already exists
  User.findOne({ name: req.body.name }).then(user => {
    if (user) {
      return res.status(400).json({ name: 'Name already exists' })
    }
    // If user is a new user, fill in name, password with data sent in the body of the request
    const newUser = new User({
      name: req.body.name,
      password: req.body.password,
    })
    // Use bcryptjs to hash the password before storing it in db
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

// Login to an account
router.post('/login', (req, res) => {
  // Pull errors and isValid from validateLoginInput(request.body) & check validation
  const { errors, isValid } = validateLoginInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  const name = req.body.name
  const password = req.body.password
  // If valid, use MongoDB to see if the user exists
  User.findOne({ name }).then(user => {
    if (!user) {
      return res.status(404).json({ userNotFound: 'User not found' })
    }
    // If user exists, use bcryptjs to compare submitted with hashed
    bcrypt.compare(password, user.password).then(isMatch => {
      // If PW match, create JWT Payload
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
        }
        // Sign jwt, including our payload and SECRET_OR_KEY from dotenv, setting in expires (time)
        jwt.sign(
          payload,
          SECRET_OR_KEY,
          { expiresIn: JWT_EXPIRY }, // 7d
          (err, token) => {
            // If successful, append token to bearer string
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

// Get Current User Dashboard
router.get(
  '/currentuser',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({ id: req.user.id, name: req.user.name })
  }
)

module.exports = router;