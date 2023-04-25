'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserProgress extends Model {
        static associate(models) {
            UserProgress.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });
            UserProgress.belongsTo(models.Exercise, {
                foreignKey: 'exerciseId',
                as: 'exercise',
            });
        }
    }

    const modelOptions = {
        sequelize,
        modelName: 'UserProgress',
        tableName: 'UserProgress',
        timestamps: true,
        sync: { alter: true },
    };

    if (process.env.NODE_ENV === 'production') {
        modelOptions.schema = process.env.DB_SCHEMA;
    }

    UserProgress.init(
        {
            userId: DataTypes.INTEGER,
            exerciseId: DataTypes.INTEGER,
            score: DataTypes.INTEGER,
            hintsUsed: DataTypes.INTEGER,
            timeSpent: DataTypes.INTEGER,
            completed: DataTypes.BOOLEAN,
        },
        modelOptions,
    );

    return UserProgress;
};
