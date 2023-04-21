'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [
            {
                username: 'AdamScoggins',
                email: 'adam@aa.io',
                password: '1234qwer',
                firstName: 'Adam',
                lastName: 'Scoggins',
                terminalTheme: 'dark',
                role: 'admin',
            },
            {
                username: 'JaneDoe',
                email: 'jane.doe@aa.io',
                password: 'password123',
                firstName: 'Jane',
                lastName: 'Doe',
                terminalTheme: 'light',
                role: 'user',
            },
            {
                username: 'JohnDoe',
                email: 'jane.does.husband@aa.io',
                password: 'password1234',
                firstName: 'John',
                lastName: 'Doe',
                terminalTheme: 'dark',
                role: 'user',
            },
        ];

        const hashedUsers = users.map((user) => ({
            ...user,
            password: bcrypt.hashSync(user.password, 10),
            createdAt: new Date(),
            updatedAt: new Date(),
        }));

        await queryInterface.bulkInsert('Users', hashedUsers);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
