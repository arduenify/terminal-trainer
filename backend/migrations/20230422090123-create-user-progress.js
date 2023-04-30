'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            `${process.env.DB_SCHEMA}.UserProgress`,
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                userId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: {
                            tableName: 'User',
                            schema: process.env.DB_SCHEMA,
                        },
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                exerciseId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: {
                            tableName: 'Exercises',
                            schema: process.env.DB_SCHEMA,
                        },
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                score: {
                    type: Sequelize.INTEGER,
                },
                hintsUsed: {
                    type: Sequelize.INTEGER,
                },
                timeSpent: {
                    type: Sequelize.INTEGER,
                },
                completed: {
                    type: Sequelize.BOOLEAN,
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
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable(`${process.env.DB_SCHEMA}.UserProgress`);
    },
};
