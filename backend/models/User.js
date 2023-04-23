'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsToMany(models.Badge, {
                through: models.UserBadge,
                foreignKey: 'userId',
                otherKey: 'badgeId',
                as: 'badges',
            });

            User.hasMany(models.UserProgress, {
                foreignKey: 'userId',
                as: 'progress',
            });
        }

        async comparePassword(candidatePassword) {
            return await bcrypt.compare(candidatePassword, this.password);
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                set(value) {
                    const hash = bcrypt.hashSync(value, 10);
                    this.setDataValue('password', hash);
                },
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            terminalTheme: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: false,
                defaultValue: 'dark',
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'user',
            },
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: true,
            sync: { alter: true },
            defaultScope: {
                attributes: { exclude: ['password'] },
            },
            scopes: {
                withPassword: {
                    attributes: { include: ['password'] },
                },
            },
        },
    );

    return User;
};
