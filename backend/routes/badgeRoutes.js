/**
 * Only administrators can access these routes.
 */

const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const { validateCreateBadge } = require('../middlewares/validationMiddleware');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

// For now, let's let the users VIEW the badges.
router.get('/', badgeController.getAllBadges);
router.get('/:id', badgeController.getBadge);
router.post(
    '/',
    authenticateAdmin,
    validateCreateBadge,
    badgeController.createBadge,
);
router.put('/:id', authenticateAdmin, badgeController.updateBadge);
router.delete('/:id', authenticateAdmin, badgeController.deleteBadge);

module.exports = router;
