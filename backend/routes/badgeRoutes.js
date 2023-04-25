/**
 * Only administrators can access these routes.
 */

const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const authenticate = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const { validateCreateBadge } = require('../middlewares/validationMiddleware');

router.get('/', authenticate, isAdmin, badgeController.getAllBadges);
router.get('/:id', authenticate, isAdmin, badgeController.getBadge);
router.post(
    '/',
    authenticate,
    isAdmin,
    validateCreateBadge,
    badgeController.createBadge,
);
router.put('/:id', authenticate, isAdmin, badgeController.updateBadge);
router.delete('/:id', authenticate, isAdmin, badgeController.deleteBadge);

module.exports = router;
