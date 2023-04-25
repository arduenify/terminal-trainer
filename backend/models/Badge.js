'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Badge extends Model {
        static associate(models) {
            Badge.belongsToMany(models.User, {
                through: models.UserBadge,
                foreignKey: 'badgeId',
                otherKey: 'userId',
            });
        }
    }

    const modelOptions = {
        sequelize,
        modelName: 'Badge',
        timestamps: true,
        sync: { alter: true },
    };

    if (process.env.NODE_ENV === 'production') {
        modelOptions.schema = process.env.DB_SCHEMA;
    }

    Badge.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            criteria: {
                type: DataTypes.JSON,
                allowNull: false,
            },
        },
        modelOptions,
    );

    return Badge;
};
