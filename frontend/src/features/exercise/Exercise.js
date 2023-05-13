import React, { useContext, useEffect, useRef, useState } from 'react';
import Terminal from './terminal';
import { useParams } from 'react-router-dom';
import { useFetchExerciseByIdQuery } from '../../store/api';
import NotificationContext from '../notification/context/NotificationContext';
import './Exercise.css';

const Exercise = () => {
    const exerciseId = useParams().id;
    const { data: exercise, refetch } = useFetchExerciseByIdQuery(exerciseId);
    const [enabled, setEnabled] = useState(true);
    const { showNotification } = useContext(NotificationContext);
    const platformSeparator = navigator.userAgent.includes('Windows')
        ? '\r\n'
        : '\n';

    const allowedCommandsRef = useRef(new Set());
    const commandOutputMapRef = useRef({});

    const terminalCommands = {
        help: {
            description: 'Displays a list of available commands.',
            output: 'Well, well, well.',
        },
        clear: {
            description: 'Clears the terminal.',
            output: 'Clearing...',
        },
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

    const finishExercise = () => {
        disableInput();
        showFinishNotification();
        return 'Congratulations on completing the exercise!';
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

        if (allowedCommandsRef.current.has(trimmedCommand)) {
            const lastCommand =
                exercise.solution[exercise.solution.length - 1].command;

            if (trimmedCommand === lastCommand) {
                return finishExercise();
            }

            return commandOutputMapRef.current[trimmedCommand].replace(
                /\n/g,
                platformSeparator,
            );
        } else if (trimmedCommand in terminalCommands) {
            return terminalCommands[trimmedCommand].output;
        }

        return `Unknown command: ${trimmedCommand.split(' ')[0]}`;
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
        if (exercise) {
            const solution =
                typeof exercise.solution === 'string'
                    ? JSON.parse(exercise.solution)
                    : exercise.solution;

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
                />
            </div>
        </div>
    );
};

export default Exercise;
