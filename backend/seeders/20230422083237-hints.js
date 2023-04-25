'use strict';

const { getQueryInterfaceOptions } = require('../utils/seederUtils');

const createHintObject = (exerciseId, hint) => ({
    exerciseId,
    hint,
    createdAt: new Date(),
    updatedAt: new Date(),
});

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const hints = [
            createHintObject(
                1,
                'What are the consonants in the word `list`? Hmm...',
            ),
            createHintObject(1, 'You can type `man ls` for a hint.'),
            createHintObject(
                2,
                'If I chose one letter to represent the `long` flag, which letter would it be? Flags usually start with a dash!',
            ),
            createHintObject(
                2,
                'Flags are like options for commands. `-la` is like saying "Hey `ls` command, give me the long output with hidden files."',
            ),
        ];

        await queryInterface.bulkInsert(
            'Hints',
            hints,
            getQueryInterfaceOptions(),
        );
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete(
            'Hints',
            null,
            getQueryInterfaceOptions(),
        );
    },
};
