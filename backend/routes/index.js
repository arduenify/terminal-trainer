const express = require('express');
const router = express.Router();

const badgeRoutes = require('./badgeRoutes');
const exerciseRoutes = require('./exerciseRoutes');
const userRoutes = require('./userRoutes');
const userBadgeRoutes = require('./userBadgeRoutes');

router.use('/badges', badgeRoutes);
router.use('/exercises', exerciseRoutes);
router.use('/users', userRoutes);
router.use('/user-badges', userBadgeRoutes);

module.exports = router;
