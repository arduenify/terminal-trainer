const passport = require('passport');
const { UnauthorizedResponse } = require('../controllers/responseController');

// module.exports = passport.authenticate('jwt', { session: false });

module.exports = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            return new UnauthorizedResponse(undefined, res);
        } else {
            req.user = user;
            return next();
        }
    })(req, res, next);
};
