'use strict';

const { getQueryInterfaceOptions } = require('../utils/seederUtils');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert(
            'Categories',
            [
                {
                    id: 1,
                    key: 'navigation-ls',
                    name: 'Navigation',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
                {
                    id: 2,
                    key: 'navigation-cd',
                    name: 'Navigation',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            ],
            getQueryInterfaceOptions(),
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'Categories',
            null,
            getQueryInterfaceOptions(),
        );
    },
};
