// Pull in validator and is-empty dependencies
// Export the validateRegisterInput function, which takes data as a parameter (sent from frontend) 
// Instantiate our errors object
// Convert all empty fields to an empty string before running validation checks (validator only works with strings)
// Check for empty fields, valid email formats, password requirements and confirm password equality using validator functions
// Return our errors object with any and all errors contained as well as isValid boolean that checks to see if we have any errors