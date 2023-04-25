const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/badges', badgeRoutes);
router.use('/user-badges', userBadgeRoutes);

module.exports = router;
