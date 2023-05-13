'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.changeColumn('Exercises', 'solution', {
            type: Sequelize.STRING(4096),
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.changeColumn('Exercises', 'solution', {
            type: Sequelize.STRING,
            allowNull: false,
        });
    },
};
