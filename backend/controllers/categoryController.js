const Category = require('../models/Category');

const {
    SuccessResponse,
    NotFoundResponse,
    CreatedResponse,
    InternalServerErrorResponse,
    NoContentResponse,
} = require('./responseController');

const getAllCategories = async (req, res) => {
    try {
        const categories = Category.findAll();

        return new SuccessResponse(categories, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to retrieve all of the categories.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = Category.findByPk(id);

        if (!category) {
            return new NotFoundResponse(undefined, res);
        }

        return new SuccessResponse(category, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to retrieve the category.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const getAllExercisesByCategoryId = async (req, res) => {
    try {
        const { id } = req.params;

        const category = Category.findByPk(id);

        if (!category) {
            return new NotFoundResponse(undefined, res);
        }

        const exercises = category.getExercises();

        return new SuccessResponse(exercises, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to retrieve all of the exercises by category.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        const category = Category.create({
            name,
            description,
        });

        return new CreatedResponse(category, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to create a category.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const { id } = req.params;

        const category = Category.findByPk(id);

        if (!category) {
            return new NotFoundResponse(undefined, res);
        }

        await Category.update({
            name,
            description,
        });

        return new SuccessResponse(category, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to update the category.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = Category.findByPk(id);

        if (!category) {
            return new NotFoundResponse(undefined, res);
        }

        await Category.destroy();

        return new NoContentResponse(undefined, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'An internal server error occured while attempting to delete the category.';

        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getAllExercisesByCategoryId,
    addCategory,
    updateCategory,
    deleteCategory,
};
