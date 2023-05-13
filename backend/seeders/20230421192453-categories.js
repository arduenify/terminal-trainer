'use strict';

const { getQueryInterfaceOptions } = require('../utils/seederUtils');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
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
                    {
                        id: 3,
                        key: 'search-pipe',
                        name: 'Search',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        id: 4,
                        key: 'search-find',
                        name: 'Search',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
                getQueryInterfaceOptions(),
            );
        } catch (error) {
            console.warn('Unable to seed categories');
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'Categories',
            null,
            getQueryInterfaceOptions(),
        );
    },
};
