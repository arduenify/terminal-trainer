const express = require('express');
const router = express.Router();
const userBadgeController = require('../controllers/userBadgeController');
const authenticate = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');

router.get('/:userId', authenticate, userBadgeController.getUserBadges);
router.post('/', authenticate, isAdmin, userBadgeController.assignBadgeToUser);

module.exports = router;
