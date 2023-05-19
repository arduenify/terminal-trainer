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

// Progress endpoints
router.get('/me/progress', isAuthenticated, userController.getUserProgress);
router.get(
    '/me/progress/:progressId',
    isAuthenticated,
    userController.getUserProgressById,
);
router.post('/me/progress', isAuthenticated, userController.createUserProgress);
router.put(
    '/me/progress/:progressId',
    isAuthenticated,
    userController.updateUserProgress,
);
router.delete(
    '/me/progress/:progressId',
    isAuthenticated,
    userController.deleteUserProgress,
);

module.exports = router;
