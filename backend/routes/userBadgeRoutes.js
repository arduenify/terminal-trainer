const express = require('express');
const router = express.Router();
const userBadgeController = require('../controllers/userBadgeController');
const authenticate = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const {
    validateCreateUserBadge,
} = require('../middlewares/validationMiddleware');

router.get('/:userId', authenticate, userBadgeController.getUserBadges);
router.post(
    '/',
    authenticate,
    isAdmin,
    validateCreateUserBadge,
    userBadgeController.assignBadgeToUser,
);

module.exports = router;
