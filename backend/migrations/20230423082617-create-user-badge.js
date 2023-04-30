'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(
            `${process.env.DB_SCHEMA}.UserBadges`,
            {
                userId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
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
                badgeId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: {
                            tableName: 'Badges',
                            schema: process.env.DB_SCHEMA,
                        },
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
        await queryInterface.dropTable(`${process.env.DB_SCHEMA}.UserBadges`);
    },
};
