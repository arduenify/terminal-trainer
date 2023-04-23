'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserBadge extends Model {
        static associate(models) {}
    }

    UserBadge.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            badgeId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'UserBadge',
            timestamps: true,
            sync: { alter: true },
        },
    );

    return UserBadge;
};
