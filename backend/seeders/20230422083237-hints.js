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
        const [exercises, metadata] = await queryInterface.sequelize.query(
            'SELECT id from "Exercises";',
        );

        const hints = [
            createHintObject(
                exercises[0].id,
                'What are the consonants in the word `list`? Hmm...',
            ),
            createHintObject(1, 'You can type `man ls` for a hint.'),
            createHintObject(
                exercises[1].id,
                'If I chose one letter to represent the `long` flag, which letter would it be? Flags usually start with a dash!',
            ),
            createHintObject(
                exercises[1].id,
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
