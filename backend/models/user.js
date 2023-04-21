const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const User = sequelize.define(
        'User',
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
        { timestamps: true, sync: { alter: true } }
    );

    User.associate = (models) => {
        User.hasMany(models.Badge, { foreignKey: 'userId', as: 'badges' });
        User.hasMany(models.UserProgress, {
            foreignKey: 'userId',
            as: 'progress',
        });
    };

    return User;
};
