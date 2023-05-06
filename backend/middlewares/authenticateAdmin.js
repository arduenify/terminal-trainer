const isAuthenticated = require('./isAuthenticated');
const isAdmin = require('./isAdmin');

const authenticateAdmin = (req, res, next) => {
    isAuthenticated(req, res, (err) => {
        if (err) {
            return next(err);
        }

        if (!req.user) {
            return new ForbiddenResponse(
                { error: 'Authentication failed.' },
                res,
            );
        }

        isAdmin(req, res, next);
    });
};

module.exports = authenticateAdmin;
