/**
 * Only administrators can access these routes.
 */

const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const { validateCreateBadge } = require('../middlewares/validationMiddleware');


router.get('/', isAuthenticated, isAdmin, badgeController.getAllBadges);
router.get('/:id', isAuthenticated, isAdmin, badgeController.getBadge);
router.post(
    '/',
    isAuthenticated,
    isAdmin,
    validateCreateBadge,
    badgeController.createBadge,
);
router.put('/:id', isAuthenticated, isAdmin, badgeController.updateBadge);
router.delete('/:id', isAuthenticated, isAdmin, badgeController.deleteBadge);

module.exports = router;
