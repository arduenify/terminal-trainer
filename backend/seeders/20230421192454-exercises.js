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
                1,
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
                1,
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
                1,
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
                'Use `cd directory_name` to change directory.',
                2,
                'beginner',
                [
                    {
                        command: 'cd my_folder',
                        output: '/home/user/my_folder',
                        instruction: 'Type `cd my_folder` and press enter.',
                    },
                ],
            ),
            createExerciseObject(
                'Create and Remove Directories',
                'Create and remove directories using `mkdir` and `rmdir` commands.',
                'Ready to create your first directory? Create a directory with the name "my_new_folder". ',
                2,
                'intermediate',
                [
                    {
                        instruction:
                            'Create a new directory named "my_new_folder".',
                        command: 'mkdir my_new_folder',
                        output: '',
                    },
                    {
                        instruction:
                            'Verify its existence by listing the directories and files.',
                        command: 'ls',
                        output: 'my_new_folder',
                    },
                    {
                        instruction: 'Remove the directory.',
                        command: 'rmdir my_new_folder',
                        output: '',
                    },
                    {
                        instruction: 'Verify that the directory was removed.',
                        command: 'ls',
                        output: '',
                    },
                ],
            ),
            createExerciseObject(
                'Move and Rename Files',
                'Learn how to move and rename files.',
                'Time to shift some files around! Some useful commands (hint hint) are `touch` and `mv`.',
                2,
                'intermediate',
                [
                    {
                        instruction: 'Create a new file named "file.txt".',
                        command: 'touch file.txt',
                        output: '',
                    },
                    {
                        instruction:
                            'Move the file into a directory named "my_folder".',
                        command: 'mv file.txt my_folder/',
                        output: '',
                    },
                    {
                        instruction:
                            'Verify its location by listing the files in "my_folder".',
                        command: 'ls my_folder',
                        output: 'file.txt',
                    },
                    {
                        instruction: 'Rename the file to "new_file.txt".',
                        command: 'mv my_folder/file.txt my_folder/new_file.txt',
                        output: '',
                    },
                    {
                        instruction:
                            'Verify the renaming by listing the files in "my_folder".',
                        command: 'ls my_folder',
                        output: 'new_file.txt',
                    },
                ],
            ),
            createExerciseObject(
                'Use Pipe and Grep to Search',
                'Learn how to search text within files using pipe and grep.',
                'Find all files in your current directory that contain the word "world". Don\'t forget about `cat`! 🐱',
                3,
                'advanced',
                [
                    {
                        instruction:
                            'Create a file named dog.txt with the text "Good boy!" using a single command. (hint: if you are confused about how to create a file with text, do a quick search on "echo")',
                        command: 'echo "Good boy!" > dog.txt',
                        output: '',
                    },
                    {
                        instruction:
                            'Display the content of the file and search for the word "Good".',
                        command: 'cat dog.txt | grep "Good"',
                        output: 'Good boy!',
                    },
                ],
            ),
            createExerciseObject(
                'Use Find to Search Files',
                'Learn how to search for files in a directory hierarchy using `find`.',
                'Search your current directory and all subdirectories for a file named "mischief.txt". Hint: use `find`',
                4,
                'advanced',
                [
                    {
                        instruction:
                            'Create a file named "mischief.txt" inside a directory named "magic".',
                        command: 'touch magic/mischief.txt',
                        output: '',
                    },
                    {
                        instruction:
                            'Find the file by searching your current directory and all subdirectories.',
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
