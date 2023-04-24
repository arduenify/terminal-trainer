/**
 * Only administrators can access these routes.
 */

const express = require('express');
const router = express.Router();
const badgeController = require('../controllers/badgeController');
const authenticate = require('../middlewares/authenticate');
const isAdmin = require('../middlewares/isAdmin');

router.get('/', authenticate, isAdmin, badgeController.getAllBadges);
router.get('/:id', authenticate, isAdmin, badgeController.getBadge);
router.post('/', authenticate, isAdmin, badgeController.createBadge);
router.put('/:id', authenticate, isAdmin, badgeController.updateBadge);
router.delete('/:id', authenticate, isAdmin, badgeController.deleteBadge);

module.exports = router;
