const express = require('express');
const router = express.Router();

const homepageStatsController = require('../controllers/statsController');

router.get('/', homepageStatsController.retrieveHomepageStats);

module.exports = router;
