const { UserBadge, Badge } = require('../models');
const {
    CreatedResponse,
    SuccessResponse,
    InternalServerErrorResponse,
    NotFoundResponse,
} = require('./responseController');

const getUserBadges = async (req, res) => {
    const { userId } = req.params;

    if (userId !== req?.user?.id) {
        return new UnauthorizedResponse(null, res);
    }

    try {
        const userBadges = await UserBadge.findAll({
            where: {
                userId,
            },
            include: {
                model: Badge,
                as: 'badge',
            },
        });

        return new SuccessResponse(userBadges, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to fetch user badges.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const getCurrentUserBadges = async (req, res) => {
    const { id: userId } = req.user;

    try {
        const userBadges = await UserBadge.findAll({
            where: {
                userId,
            },
            include: {
                model: Badge,
                as: 'badge',
            },
        });

        return new SuccessResponse(userBadges, res);
    } catch (err) {
        console.error(err);
        const errorMessage =
            err.message ||
            'Internal server error when attempting to fetch user badges.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const assignBadgeToUser = async (req, res) => {
    const { badgeId, userId } = req.body;

    try {
        const badge = await Badge.findByPk(badgeId);

        if (!badge) {
            return new NotFoundResponse(null, res);
        }

        const userBadge = await UserBadge.create({ badgeId, userId });

        return new CreatedResponse(userBadge, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to assign badge to user.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

module.exports = {
    getUserBadges,
    assignBadgeToUser,
    getCurrentUserBadges,
};
