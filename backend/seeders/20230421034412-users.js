'use strict';
const bcrypt = require('bcryptjs');
const { getQueryInterfaceOptions } = require('../utils/seederUtils');
require('dotenv').config();

const DEFAULT_SEED_PASSWORD = process.env.DEFAULT_SEED_PASSWORD;

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [
            {
                username: 'AdamScoggins',
                email: 'adam@aa.io',
                firstName: 'Adam',
                lastName: 'Scoggins',
                terminalTheme: 'dark',
                role: 'admin',
            },
            {
                username: 'JaneDoe',
                email: 'jane.doe@aa.io',
                firstName: 'Jane',
                lastName: 'Doe',
                terminalTheme: 'light',
                role: 'user',
            },
            {
                username: 'JohnDoe',
                email: 'jane.does.husband@aa.io',
                firstName: 'John',
                lastName: 'Doe',
                terminalTheme: 'dark',
                role: 'user',
            },
            {
                username: process.env.DEMO_USERNAME,
                email: process.env.DEMO_EMAIL,
                firstName: 'Jake',
                lastName: 'FromStateFarm',
                terminalTheme: 'dark',
                role: 'admin',
            },
        ];

        const hashedUsers = users.map((user) => ({
            ...user,
            password: bcrypt.hashSync(DEFAULT_SEED_PASSWORD),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        try {
            await queryInterface.bulkInsert(
                'Users',
                hashedUsers,
                getQueryInterfaceOptions(),
            );
        } catch (error) {
            console.warn('Unable to seed users');
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            'Users',
            null,
            getQueryInterfaceOptions(),
        );
    },
};
