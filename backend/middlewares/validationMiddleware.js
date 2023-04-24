const { check } = require('express-validator');
const { validationResult } = require('express-validator');
const { BadRequestResponse } = require('../controllers/responseController');

// Middleware for validating user registration
const validateUserRegistration = [
    check('username', 'Username is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
    _handleValidationErrors,
];

// Middleware for validating user login
const validateUserLogin = [
    check('usernameOrEmail', 'Username or email is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    _handleValidationErrors,
];

// If there are any validation errors, send a response with the errors,
// otherwise, move on to the next middlware.
async function _handleValidationErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return new BadRequestResponse({
            errors: errors.array(),
        });
    } else {
        next();
    }
}

module.exports = {
    validateUserRegistration,
    validateUserLogin,
};
