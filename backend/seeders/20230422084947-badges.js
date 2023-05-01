'use strict';

const { getQueryInterfaceOptions } = require('../utils/seederUtils');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.bulkInsert(
                'Badges',
                [
                    {
                        name: 'Beginner Navigator',
                        description:
                            'Complete all beginner navigation exercises.',
                        icon: '🧭',
                        criteria: JSON.stringify({
                            exercises: [1, 2],
                        }),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        name: 'File Management Pro',
                        description: 'Complete all file management exercises.',
                        icon: '📁',
                        criteria: JSON.stringify({
                            exercises: [3, 4],
                        }),
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                ],
                getQueryInterfaceOptions(),
            );
        } catch (error) {
            console.warn('Unable to seed badges');
        }
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'Badges',
            null,
            getQueryInterfaceOptions(),
        );
    },
};
