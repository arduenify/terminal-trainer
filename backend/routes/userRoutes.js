const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const {
    validateUserRegistration,
    validateUserLogin,
} = require('../middlewares/validationMiddleware');

const {
    register,
    login,
    demoUserLogin,
    getUserProfile,
    updateUserProfile,
    deleteUserAccount,
} = userController;

router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.post('/demo-login', demoUserLogin);
router.get('/me', isAuthenticated, getUserProfile);
router.put('/me', isAuthenticated, updateUserProfile);
router.delete('/me', isAuthenticated, deleteUserAccount);

module.exports = router;
