'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class UserBadge extends Model {
        static associate(models) {
            UserBadge.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'userId',
            });
            UserBadge.belongsTo(models.Badge, {
                as: 'badge',
                foreignKey: 'badgeId',
            });
        }
    }

    const modelOptions = {
        sequelize,
        modelName: 'UserBadge',
        timestamps: true,
        sync: { alter: true },
    };

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
        modelOptions,
    );

    return UserBadge;
};
