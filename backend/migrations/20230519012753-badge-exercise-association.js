'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.addColumn('Exercises', 'badgeId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'Badges',
                },
                key: 'id',
            },
        });
        await queryInterface.addColumn('Badges', 'exerciseId', {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: {
                    tableName: 'Exercises',
                },
                key: 'id',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Exercises', 'badgeId');
        await queryInterface.removeColumn('Badges', 'exerciseId');
    },
};
