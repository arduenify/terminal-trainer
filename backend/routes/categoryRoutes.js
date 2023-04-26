const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const isAuthenticated = require('../middlewares/isAuthenticated');
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/exercises', categoryController.getAllExercisesByCategoryId);
router.post('/', isAuthenticated, isAdmin, categoryController.addCategory);
router.put('/:id', isAuthenticated, isAdmin, categoryController.updateCategory);
router.delete(
    '/:id',
    isAuthenticated,
    isAdmin,
    categoryController.deleteCategory,
);

module.exports = router;
