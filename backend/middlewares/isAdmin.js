const { ForbiddenResponse } = require('../controllers/responseController');
const { User } = require('../models');

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (user && user.isAdmin) {
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
