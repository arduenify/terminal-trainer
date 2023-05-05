const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/exercises', categoryController.getAllExercisesByCategoryId);
router.post('/', authenticateAdmin, categoryController.addCategory);
router.put('/:id', authenticateAdmin, categoryController.updateCategory);
router.delete('/:id', authenticateAdmin, categoryController.deleteCategory);

module.exports = router;
