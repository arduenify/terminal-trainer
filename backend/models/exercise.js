'use strict';

const { Model, Op } = require('sequelize');

const Category = require('./category');

module.exports = (sequelize, DataTypes) => {
    class Exercise extends Model {
        static associate(models) {
            Exercise.hasMany(models.Hint, {
                foreignKey: 'exerciseId',
                as: 'hints',
                onDelete: 'CASCADE',
            });

            Exercise.hasMany(models.UserProgress, {
                foreignKey: 'exerciseId',
                as: 'progress',
            });

            Exercise.belongsTo(models.Category, {
                foreignKey: 'categoryId',
                as: 'category',
            });
        }

        static async getExerciseById(id) {
            const exercise = await Exercise.findByPk(id);
            return exercise;
        }

        static async getAllExercises() {
            const exercises = await Exercise.findAll();
            return exercises;
        }

        static async searchExercises({ categoryId, difficulty, title }) {
            const where = {};

            if (categoryId) {
                where.categoryId = categoryId;
            }

            if (difficulty) {
                where.difficulty = difficulty;
            }

            if (title) {
                where.title = { [Op.like]: `%${title}%` };
            }

            const exercises = await Exercise.findAll({
                where,
                include: [
                    {
                        model: Category,
                        as: 'category',
                        attributes: ['key', 'name'],
                    },
                ],
            });

            return exercises;
        }

        static async getExercisesByCategory(category) {
            const exercises = await this.searchExercises({ category });
            return exercises;
        }

        static async getExercisesByDifficulty(difficulty) {
            const exercises = await this.searchExercises({ difficulty });
            return exercises;
        }

        async updateExercise({
            title,
            description,
            category,
            difficulty,
            solution,
            teachingText,
        }) {
            if (title) this.title = title;
            if (description) this.description = description;
            if (category) this.category = category;
            if (difficulty) this.difficulty = difficulty;
            if (solution) this.solution = solution;
            if (teachingText) this.teachingText = teachingText;

            await this.save();

            return this;
        }

        async deleteExercise() {
            await this.destroy();
        }

        async addHint({ title, description }) {
            const hint = this.createHint({
                title,
                description,
            });

            return hint;
        }

        async getAllHints() {
            const hints = await this.getHints();
            return hints;
        }
    }

    Exercise.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            difficulty: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            teachingText: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            solution: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    const solution = this.getDataValue('solution');
                    return JSON.parse(solution);
                },
                set(value) {
                    this.setDataValue('solution', JSON.stringify(value));
                },
            },
        },
        {
            sequelize,
            modelName: 'Exercise',
            timestamps: true,
            sync: { alter: true },
        },
    );

    return Exercise;
};
