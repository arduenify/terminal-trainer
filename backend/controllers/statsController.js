const { Exercise, Badge, User } = require('../models');
const {
    SuccessResponse,
    InternalServerErrorResponse,
} = require('./responseController');

async function retrieveHomepageStats(req, res) {
    try {
        const totalUsers = await User.count();
        const totalExercises = await Exercise.count();
        const totalBadges = await Badge.count();

        const stats = {
            totalUsers,
            totalExercises,
            totalBadges,
        };

        return new SuccessResponse(stats, res);
    } catch (error) {
        const errorMessage =
            error.message || 'Failed to retrieve homepage stats.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
}

module.exports = {
    retrieveHomepageStats,
};
