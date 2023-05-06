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
            solution: JSON.stringify(solution),
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
                [{ command: 'ls', output: 'file1.txt\nfile2.txt\ndirectory1' }],
            ),
            createExerciseObject(
                'List Files in a Directory (Long Format)',
                'Learn how to list all files and directories in the current directory using the long format.',
                'Want more details about your files? Use `ls -l` to list files and directories with extra information like permissions, ownership, and timestamps.',
                1,
                'easy',
                [
                    {
                        command: 'ls -l',
                        output: '-rw-r--r-- 1 user user 1024 May 1 12:34 file1.txt\n-rw-r--r-- 1 user user 2048 May 1 12:35 file2.txt\ndrwxr-xr-x 2 user user 4096 May 1 12:36 directory1',
                    },
                ],
            ),
            createExerciseObject(
                'List Files in a Directory (All Files)',
                'Discover how to list all files, including hidden ones, in the current directory.',
                'Ever wondered what secrets your directories are hiding? Use `ls -a` to reveal all files, uncovering the mysteries and hidden files in your filesystem.',
                1,
                'easy',
                [
                    {
                        command: 'ls -a',
                        output: '.\n..\nfile1.txt\nfile2.txt\n.directory1\n.directory2',
                    },
                ],
            ),
            createExerciseObject(
                'List Files in a Directory (Human-Readable Sizes)',
                'Learn to list all files and directories with their sizes in a human-readable format.',
                "Size matters! Use `ls -lh` to list files and directories with their sizes in a more understandable format (like '2K' or '3M'). Try it out!",
                1,
                'easy',
                [
                    {
                        command: 'ls -lh',
                        output: '-rw-r--r-- 1 user user 1K May 1 12:34 file1.txt\n-rw-r--r-- 1 user user 2K May 1 12:35 file2.txt\ndrwxr-xr-x 2 user user 4K May 1 12:36 directory1',
                    },
                ],
            ),
            createExerciseObject(
                'Change Directories',
                'Master the art of navigating between directories using the `cd` command.',
                "Ready to move around? Use the `cd` command followed by a directory's name to change your current directory. For example, `cd my_folder` will take you inside the 'my_folder' directory. Try it out and start exploring!",
                2,
                'easy',
                [
                    {
                        command: 'cd',
                        output: '/home/user/my_folder',
                    },
                ],
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
            console.error(error);
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
