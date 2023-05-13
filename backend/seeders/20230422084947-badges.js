'use strict';

const { getQueryInterfaceOptions } = require('../utils/seederUtils');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.bulkInsert(
                'Badges',
                [
                    {
                        name: 'Signup',
                        description: 'Signup for Terminal Trainer.',
                        icon: '🎉',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        name: 'Beginner Navigator',
                        description:
                            'Complete all beginner navigation exercises.',
                        icon: '🧭',
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    },
                    {
                        name: 'File Management Pro',
                        description: 'Complete all file management exercises.',
                        icon: '📁',
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
