const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const badgeRoutes = require('./badgeRoutes');
const userBadgeRoutes = require('./userBadgeRoutes');

router.use('/users', userRoutes);
router.use('/user-badges', userBadgeRoutes);

module.exports = router;
