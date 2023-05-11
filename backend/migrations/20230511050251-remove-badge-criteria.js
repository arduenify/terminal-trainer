'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn('Badges', 'criteria');
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn('Badges', 'criteria', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
};
