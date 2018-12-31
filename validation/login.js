const validator = require('validator')
const isEmpty = require('is-empty')

module.exports = function validateRegisterInput(data) {
  let errors = {}
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : ''
  data.password = !isEmpty(data.password) ? data.password : ''
  // Name checks
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required'
  } 
  // Password checks
  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required'
  }

  return {
    errors,
    isValid: isEmpty(errors),
  }
}
