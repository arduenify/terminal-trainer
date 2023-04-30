'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            `${process.env.DB_SCHEMA}.Hints`,
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                exerciseId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    references: {
                        model: {
                            tableName: '"Exercises"',
                            schema: process.env.DB_SCHEMA,
                        },
                        key: 'id',
                    },
                },
                hint: {
                    type: Sequelize.TEXT,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.NOW,
                },
            },
            {},
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(`${process.env.DB_SCHEMA}.Hints`);
    },
};
