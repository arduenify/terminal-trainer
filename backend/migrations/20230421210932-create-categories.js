'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            `${process.env.DB_SCHEMA}.Categories`,
            {
                id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
                },
                key: {
                    allowNull: false,
                    unique: true,
                    type: Sequelize.STRING,
                },
                name: {
                    allowNull: false,
                    type: Sequelize.STRING,
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
        await queryInterface.dropTable(`${process.env.DB_SCHEMA}.Categories`);
    },
};
