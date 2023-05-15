const { Exercise } = require('../models');
const {
    SuccessResponse,
    NotFoundResponse,
    InternalServerErrorResponse,
    NoContentResponse,
} = require('./responseController');

const getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.findAll();
        return new SuccessResponse(exercises, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to get all exercises.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const getExerciseById = async (req, res) => {
    try {
        const { id } = req.params;
        const exercise = await Exercise.findByPk(id);

        if (!exercise) {
            return new NotFoundResponse(null, res);
        }

        return new SuccessResponse(exercise, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to get exercise by id.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const createExercise = async (req, res) => {
    try {
        const {
            title,
            description,
            teachingText,
            difficulty,
            categoryId,
            solution,
        } = req.body;

        const exercise = await Exercise.create({
            title,
            description,
            teachingText,
            difficulty,
            solution,
            categoryId,
        });

        return new SuccessResponse(exercise, res);
    } catch (err) {
        console.log(err);
        const errorMessage =
            err.message ||
            'Internal server error when attempting to create exercise.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const updateExercise = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            teachingText,
            difficulty,
            categoryId,
            solution,
        } = req.body;

        const exercise = await Exercise.findByPk(id);

        if (!exercise) {
            return new NotFoundResponse(null, res);
        }

        await exercise.update({
            title,
            description,
            teachingText,
            difficulty,
            categoryId,
            solution,
        });

        return new SuccessResponse(undefined, res);
    } catch (err) {
        console.log(err);
        const errorMessage =
            err.message ||
            'Internal server error when attempting to update exercise.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const deleteExercise = async (req, res) => {
    const { id } = req.params;

    try {
        const exercise = await Exercise.findByPk(id);

        if (!exercise) {
            return new NotFoundResponse(null, res);
        }

        await exercise.destroy();

        return new NoContentResponse(res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to delete exercise.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const getAllHints = async (req, res) => {
    const { id } = req.params;

    try {
        const exercise = await Exercise.findByPk(id);

        if (!exercise) {
            return new NotFoundResponse(null, res);
        }

        const hints = await exercise.getHints();

        return new SuccessResponse(hints, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to get all hints.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

module.exports = {
    getAllExercises,
    getExerciseById,
    createExercise,
    updateExercise,
    deleteExercise,
    getAllHints,
};
