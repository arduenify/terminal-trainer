/**
 * This controller is only used by administrators.
 */

const { Badge } = require('../models');
const {
    SuccessResponse,
    NotFoundResponse,
    NoContentResponse,
    InternalServerErrorResponse,
} = require('./responseController');

const getAllBadges = async (req, res) => {
    try {
        const badges = await Badge.findAll();

        return new SuccessResponse(badges, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to get all badges.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const getBadge = async (req, res) => {
    const { id } = req.params;

    try {
        const badge = await Badge.findByPk(id);

        if (!badge) {
            return new NotFoundResponse(null, res);
        }

        return new SuccessResponse(badge, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to get badge by id.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const createBadge = async (req, res) => {
    const { name, description, icon, critera } = req.body;

    try {
        const badge = await Badge.create({ name, description, icon, critera });

        return new CreatedResponse(badge, res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to create badge.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const updateBadge = async (req, res) => {
    const { id } = req.params;

    const { name, description, icon, critera } = req.body;

    try {
        const badge = await Badge.findByPk(id);

        if (!badge) {
            return new NotFoundResponse(null, res);
        }

        const fieldsToUpdate = {};
        if (name) fieldsToUpdate.name = name;
        if (description) fieldsToUpdate.description = description;
        if (icon) fieldsToUpdate.icon = icon;
        if (critera) fieldsToUpdate.critera = critera;

        await badge.update(fieldsToUpdate);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to update badge.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

const deleteBadge = async (req, res) => {
    const { id } = req.params;

    try {
        const badge = await Badge.findByPk(id);

        if (!badge) {
            return new NotFoundResponse(null, res);
        }

        await badge.destroy();
        return new NoContentResponse(res);
    } catch (err) {
        const errorMessage =
            err.message ||
            'Internal server error when attempting to delete badge.';
        return new InternalServerErrorResponse({ error: errorMessage }, res);
    }
};

module.exports = {
    getAllBadges,
    createBadge,
    getBadge,
    updateBadge,
    deleteBadge,
};
