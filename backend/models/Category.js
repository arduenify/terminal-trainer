'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Exercise, {
                foreignKey: 'categoryId',
                as: 'exercises',
            });
        }
    }

    const modalOptions = {
        sequelize,
        modelName: 'Category',
        timestamps: true,
        sync: { alter: true },
    };

    if (process.env.NODE_ENV === 'production') {
        modelOptions.schema = process.env.DB_SCHEMA;
    }

    Category.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            key: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        modalOptions,
    );

    return Category;
};
