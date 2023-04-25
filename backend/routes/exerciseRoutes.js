const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const exerciseController = require('../controllers/exerciseController');

router.get('/', exerciseController.getAllExercises);
router.get('/:id', exerciseController.getExerciseById);
router.post('/', isAdmin, exerciseController.createExercise);
router.put('/:id', isAdmin, exerciseController.updateExercise);
router.delete('/:id', isAdmin, exerciseController.deleteExercise);
router.get('/:id/hints', exerciseController.getAllHints);

module.exports = router;
