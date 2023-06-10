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
                'Learn how to list files and directories in the current directory.',
                'Use the `ls` command to list files and directories.',
                1, // Category ID for 'Navigation'
                'beginner',
                [
                    {
                        command: 'ls',
                        output: 'file1.txt\nfile2.txt\ndirectory1',
                        instruction: 'Type `ls` and press enter.',
                    },
                ],
            ),
            createExerciseObject(
                'List Files in a Directory (Long Format)',
                'List files and directories with detailed information.',
                'Use `ls -l` for a detailed listing.',
                1, // Category ID for 'Navigation'
                'beginner',
                [
                    {
                        command: 'ls -l',
                        output: '-rw-r--r-- 1 user user 1024 May 1 12:34 file1.txt\n-rw-r--r-- 1 user user 2048 May 1 12:35 file2.txt\ndrwxr-xr-x 2 user user 4096 May 1 12:36 directory1',
                        instruction: 'Type `ls -l` and press enter.',
                    },
                ],
            ),
            createExerciseObject(
                'List Files in a Directory (All Files)',
                'Discover how to list all files, including hidden ones.',
                'Use `ls -a` to reveal all files.',
                1, // Category ID for 'Navigation'
                'beginner',
                [
                    {
                        command: 'ls -a',
                        output: '.\n..\nfile1.txt\nfile2.txt\n.directory1\n.directory2',
                        instruction: 'Type `ls -a` and press enter.',
                    },
                ],
            ),
            createExerciseObject(
                'Change Directories',
                'Navigate between directories using the `cd` command.',
                "Let's go inside a directory!",
                1, // Category ID for 'Navigation'
                'beginner',
                [
                    {
                        command: 'cd directory1',
                        output: '',
                        instruction: 'Type `cd directory1` and press enter.',
                    },
                ],
            ),
            createExerciseObject(
                'Create and Remove Directories',
                'Create and remove directories using `mkdir` and `rmdir` commands.',
                'Ready to create and delete your first directory?',
                1, // Category ID for 'Navigation'
                'intermediate',
                [
                    {
                        instruction:
                            'Create a new directory named "my_new_directory", using "mkdir".',
                        command: 'mkdir my_new_directory',
                        output: '',
                    },
                    {
                        instruction:
                            'Verify its existence by listing the directories and files.',
                        command: 'ls',
                        output: 'my_new_directory',
                    },
                    {
                        instruction:
                            'Now, remove the directory "my_new_directory", using "rmdir".',
                        command: 'rmdir my_new_directory',
                        output: '',
                    },
                    {
                        instruction:
                            'Verify that the directory was removed by listing the directories and files.',
                        command: 'ls',
                        output: '',
                    },
                ],
            ),
            createExerciseObject(
                'Move and Rename Files',
                'Learn how to move and rename files.',
                "Let's manipulate some files!",
                1, // Category ID for 'Navigation'
                'intermediate',
                [
                    {
                        instruction:
                            'First, create a new file (using touch) named "file.txt".',
                        command: 'touch file.txt',
                        output: '',
                    },
                    {
                        instruction:
                            'Move the file into a directory named "directory1".',
                        command: 'mv file.txt directory1',
                        output: '',
                    },
                    {
                        instruction:
                            'Verify its location by listing the files in "directory1".',
                        command: 'ls directory1',
                        output: 'file.txt',
                    },
                    {
                        instruction:
                            'Rename the file to "new_file.txt" inside "directory1".',
                        command:
                            'mv directory1/file.txt directory1/new_file.txt',
                        output: '',
                    },
                    {
                        instruction:
                            'Verify the renaming by listing the files in "directory1".',
                        command: 'ls directory1',
                        output: 'new_file.txt',
                    },
                ],
            ),
            createExerciseObject(
                'Use Pipe and Grep to Search',
                'Learn how to search text within files using pipe and grep.',
                "Let's search for specific text in a file!",
                3, // Category ID for 'Search'
                'advanced',
                [
                    {
                        instruction:
                            'Create a file named dog.txt with the text "Good boy!", using echo and ">".',
                        command: 'echo "Good boy!" > dog.txt',
                        output: '',
                    },
                    {
                        instruction:
                            'Display the content of the file and search for the word "Good", using "cat", pipe and "grep".',
                        command: 'cat dog.txt | grep "Good"',
                        output: 'Good boy!',
                    },
                ],
            ),
            createExerciseObject(
                'Use Find to Search Files',
                'Learn how to search for files in a directory hierarchy using `find`.',
                'Let\'s find a file named "mischief.txt" in your directories.',
                4, // Category ID for 'Search'
                'advanced',
                [
                    {
                        instruction: 'First, create a directory named "magic".',
                        command: 'mkdir magic',
                        output: '',
                    },
                    {
                        instruction:
                            'Now, create a file named "mischief.txt" inside the "magic" directory.',
                        command: 'touch magic/mischief.txt',
                        output: '',
                    },
                    {
                        instruction:
                            'Use the find command to search for "mischief.txt" in the current directory and subdirectories. Try this one on your own.',
                        command: 'find . -name mischief.txt',
                        output: './magic/mischief.txt',
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
