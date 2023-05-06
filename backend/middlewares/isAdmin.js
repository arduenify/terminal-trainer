const {
    ForbiddenResponse,
    InternalServerErrorResponse,
} = require('../controllers/responseController');

const isAdmin = async (req, res, next) => {
    try {
        const user = req.user;

        console.log('Passport User Requesting Admin privileges:', user);

        if (user && user.role === 'admin') {
            return next();
        } else {
            return new ForbiddenResponse(
                { error: 'Only administrators can perform this action.' },
                res,
            );
        }
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to authorize the request.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

module.exports = isAdmin;
