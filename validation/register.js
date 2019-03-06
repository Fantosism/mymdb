const validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}
  data.name = !isEmpty(data.name) ? data.name : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : ''
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required'
  }
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required'
  }
  if (validator.isEmpty(data.passwordConfirm)) {
    errors.passwordConfirm = 'Must Confirm Password'
  }
  if (!validator.isLength(data.password, { min: 8, max: 45 })) {
    errors.password = `Password must be at ${
      this.min
    } characters long and at most ${this.max} characters long`
  }
  if (!validator.equals(data.password, data.passwordConfirm)) {
    errors.passwordConfirm = 'Passwords must match'
  }
  return {
    errors,
    isValid: isEmpty(errors),
  }
}
