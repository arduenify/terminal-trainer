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

    UserProgress.init(
        {
            userId: DataTypes.INTEGER,
            exerciseId: DataTypes.INTEGER,
            score: DataTypes.INTEGER,
            hintsUsed: DataTypes.INTEGER,
            timeSpent: DataTypes.INTEGER,
            completed: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: 'UserProgress',
            tableName: 'UserProgress',
            timestamps: true,
            sync: { alter: true },
        },
    );

    return UserProgress;
};
