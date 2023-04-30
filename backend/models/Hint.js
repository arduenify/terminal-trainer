'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Hint extends Model {
        static associate(models) {
            Hint.belongsTo(models.Exercise, {
                foreignKey: 'exerciseId',
                as: 'exercise',
            });
        }

        static async findByExerciseId(exerciseId) {
            return await Hint.findAll({ where: { exerciseId } });
        }
    }

    const modelOptions = {
        sequelize,
        modelName: 'Hint',
        timestamps: true,
        sync: { alter: true },
    };

    Hint.init(
        {
            exerciseId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Exercises',
                    key: 'id',
                },
            },
            hint: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        modelOptions,
    );

    return Hint;
};
