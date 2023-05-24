import React, { useContext, useEffect, useRef, useState } from 'react';
import Terminal from './terminal';
import { useParams } from 'react-router-dom';
import {
    useCreateProgressMutation,
    useFetchExerciseByIdQuery,
    useUpdateProgressByIdMutation,
} from '../../store/api';
import NotificationContext from '../notification/context/NotificationContext';
import './Exercise.css';

const Exercise = () => {
    const exerciseId = useParams().id;
    const { data: exercise, refetch } = useFetchExerciseByIdQuery(exerciseId);
    const [createProgress] = useCreateProgressMutation();
    const [updateProgress] = useUpdateProgressByIdMutation();
    const [enabled, setEnabled] = useState(true);
    const [currentInstruction, setCurrentInstruction] = useState(null);

    const { showNotification } = useContext(NotificationContext);
    const platformSeparator = navigator.userAgent.includes('Windows')
        ? '\r\n'
        : '\n';

    const allowedCommandsRef = useRef(new Set());
    const commandOutputMapRef = useRef({});
    const currentCommandIndexRef = useRef(0);
    const timeSpentRef = useRef(0);

    const getTimeSpent = () => {
        const now = new Date().getTime();
        const diff = now - timeSpentRef.current;
        const seconds = Math.floor(diff / 1000);
        timeSpentRef.current = now;
        return seconds;
    };

    const terminalCommands = {
        help: {
            description: 'Displays a list of available commands.',
            output: 'Well, well, well.',
        },
        // clear: {
        //     description: 'Clears the terminal.',
        //     output: 'Clearing...',
        // },
    };

    terminalCommands.help.output = Object.entries(terminalCommands)
        .map(([command, { description }]) => `${command}: ${description}`)
        .join('\n');

    const disableInput = () => {
        const terminalInputs = document.getElementsByClassName(
            'xterm-helper-textarea',
        );

        if (terminalInputs.length) {
            for (const terminalInput of terminalInputs) {
                terminalInput.disabled = true;
            }
        }

        setEnabled(false);
    };

    const showFinishNotification = () => {
        showNotification({
            title: 'Exercise complete!',
            text: 'Well done! Congratulations on completing this exercise.',
        });
    };

    const calculateScore = (difficulty) => {
        let score = 0;

        if (difficulty === 'beginner') {
            score = 100;
        } else if (difficulty === 'intermediate') {
            score = 200;
        } else if (difficulty === 'advanced') {
            score = 300;
        }

        return score;
    };

    const dispatchCreateProgress = async (score, timeSpent) => {
        const createdActionResult = await createProgress({
            exerciseId,
            completed: true,
            score,
            timeSpent,
        });

        // if 409 conflict, grab progressId from response & update progress
        if (createdActionResult.error?.status === 409) {
            return dispatchUpdateProgress(
                score,
                timeSpent,
                createdActionResult.error?.data?.progressId,
            );
        }
    };

    const dispatchUpdateProgress = async (score, timeSpent, progressId) => {
        await updateProgress({
            progressId: progressId,
            exerciseId,
            completed: true,
            score,
            timeSpent,
        });
    };

    const finishExercise = () => {
        disableInput();
        showFinishNotification();

        const score = calculateScore(exercise.difficulty);
        const timeSpent = getTimeSpent();

        dispatchCreateProgress(score, timeSpent);

        return '\x1b[34mCongratulations on completing the exercise!\x1b[0m';
    };

    const handleCommand = (command) => {
        const trimmedCommand = command.trim();

        if (!trimmedCommand.length) {
            return '';
        }

        const builtInCommandOutput = handleBuiltInCommand(trimmedCommand);

        if (builtInCommandOutput) {
            return builtInCommandOutput;
        }

        const commandList = Array.from(allowedCommandsRef.current);
        const expectedCommand = commandList[currentCommandIndexRef.current];

        if (trimmedCommand === expectedCommand) {
            const output = commandOutputMapRef.current[trimmedCommand].replace(
                /\n/g,
                platformSeparator,
            );

            currentCommandIndexRef.current += 1;

            const solution =
                typeof exercise.solution === 'string'
                    ? JSON.parse(exercise.solution)
                    : exercise.solution;

            const nextInstruction =
                solution[currentCommandIndexRef.current]?.instruction;

            if (trimmedCommand === commandList[commandList.length - 1]) {
                const finishOutput = finishExercise();
                return {
                    output: `${output}${platformSeparator}${finishOutput}`,
                    finished: true,
                };
            }

            return {
                output: output,
                finished: false,
                nextInstruction,
            };
        } else if (trimmedCommand in terminalCommands) {
            return {
                output: terminalCommands[trimmedCommand].output,
                finished: false,
            };
        }

        return {
            output: `Unknown command: ${trimmedCommand.split(' ')[0]}`,
            finished: false,
        };
    };

    const handleBuiltInCommand = (command) => {
        switch (command) {
            case 'help':
                return Object.entries(terminalCommands)
                    .map(
                        ([command, { description }]) =>
                            `${command}: ${description}`,
                    )
                    .join(platformSeparator);
            default:
                return null;
        }
    };

    useEffect(() => {
        timeSpentRef.current = new Date().getTime();
    }, [timeSpentRef]);

    useEffect(() => {
        if (exercise) {
            const solution =
                typeof exercise.solution === 'string'
                    ? JSON.parse(exercise.solution)
                    : exercise.solution;

            const firstInstruction = solution[0]?.instruction;
            setCurrentInstruction(firstInstruction);

            const commands = new Set(solution.map((step) => step.command));

            const map = {};
            solution.forEach((step) => {
                map[step.command] = step.output;
            });

            allowedCommandsRef.current = commands;
            commandOutputMapRef.current = map;
        }
    }, [exercise]);

    useEffect(() => {
        refetch();
    }, [exerciseId, refetch]);

    if (!exercise) {
        return null;
    }

    return (
        <div className='exercise-container'>
            <div className='exercise-info'>
                <h2>{exercise.title}</h2>
                <p>{exercise.teachingText}</p>
                <Terminal
                    onCommand={(command) => handleCommand(command)}
                    enabled={enabled}
                    instruction={currentInstruction}
                />
            </div>
        </div>
    );
};

export default Exercise;
