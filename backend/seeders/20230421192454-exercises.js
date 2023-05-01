'use strict';

const { getQueryInterfaceOptions } = require('../utils/seederUtils');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const createExerciseObject = (
            title,
            description,
            teachingText,
            categoryId,
            difficulty,
            solution,
        ) => ({
            title,
            description,
            teachingText,
            categoryId,
            difficulty,
            solution,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const exercises = [
            createExerciseObject(
                'List Files in a Directory',
                'In this exercise, you will learn how to list all files and directories in the current directory.',
                'Ready to explore your files? Use the `ls` command to list all the files and directories in your current directory. Go ahead, give it a try!',
                1,
                'easy',
                ['ls'],
            ),
            createExerciseObject(
                'List Files in a Directory (Long Format)',
                'Learn how to list all files and directories in the current directory using the long format.',
                'Want more details about your files? Use `ls -l` to list files and directories with extra information like permissions, ownership, and timestamps.',
                1,
                'easy',
                ['ls -l'],
            ),
            createExerciseObject(
                'List Files in a Directory (All Files)',
                'Discover how to list all files, including hidden ones, in the current directory.',
                'Ever wondered what secrets your directories are hiding? Use `ls -a` to reveal all files, uncovering the mysteries and hidden files in your filesystem.',
                1,
                'easy',
                ['ls -a'],
            ),
            createExerciseObject(
                'List Files in a Directory (Human-Readable Sizes)',
                'Learn to list all files and directories with their sizes in a human-readable format.',
                "Size matters! Use `ls -lh` to list files and directories with their sizes in a more understandable format (like '2K' or '3M'). Try it out!",
                1,
                'easy',
                ['ls -lh'],
            ),
            createExerciseObject(
                'Change Directories',
                'Master the art of navigating between directories using the `cd` command.',
                "Ready to move around? Use the `cd` command followed by a directory's name to change your current directory. For example, `cd my_folder` will take you inside the 'my_folder' directory. Try it out and start exploring!",
                2,
                'easy',
                ['cd'],
            ),
        ];

        try {
            await queryInterface.bulkInsert(
                'Exercises',
                exercises,
                getQueryInterfaceOptions(),
            );
        } catch (error) {
            console.warn('Unable to seed exercises');
        }
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            'Exercises',
            null,
            getQueryInterfaceOptions(),
        );
    },
};
