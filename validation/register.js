// Pull in validator and is-empty dependencies
const validator = require('validator')
const isEmpty = require('is-empty')

// Export the validateRegisterInput function, which takes data as a parameter (sent from frontend)
module.exports = function validateRegisterInput(data) {
  // Instantiate our errors object
  let errors = {}
  // Convert all empty fields to an empty string before running validation checks (validator only works with strings)
  data.name = !isEmpty(data.name) ? data.name : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  data.passwordConfirm = !isEmpty(data.passwordConfirm)
    ? data.passwordConfirm
    : ''
  // Check for empty fields, password requirements and confirm password equality using validator functions
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
  // Return our errors object with any and all errors contained as well as isValid boolean that checks to see if we have any errors
  return {
    errors,
    isValid: isEmpty(errors),
  }
}
