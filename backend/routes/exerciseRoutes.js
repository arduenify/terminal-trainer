const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');
const authenticateAdmin = require('../middlewares/authenticateAdmin');

router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExerciseById);
router.post('/', authenticateAdmin, exerciseController.createExercise);
router.put('/:id', authenticateAdmin, exerciseController.updateExercise);
router.delete('/:id', authenticateAdmin, exerciseController.deleteExercise);
router.get('/:id/hints', exerciseController.getAllHints);

module.exports = router;
