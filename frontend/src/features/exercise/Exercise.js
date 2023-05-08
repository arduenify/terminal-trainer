import React, { useEffect, useRef, useState } from 'react';
import Terminal from './terminal';
import { useParams } from 'react-router-dom';
import { useLoader } from '../modernLoader/context';
import { useFetchExerciseByIdQuery } from '../../store/api';
import './Exercise.css';

const Exercise = () => {
    const exerciseId = useParams().id;
    const { showLoader, hideLoader } = useLoader();
    const {
        data: exercise,
        refetch,
        isFetching,
    } = useFetchExerciseByIdQuery(exerciseId);

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

    const finishExercise = () => {};

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
                finishExercise();
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
            const commands = new Set(
                exercise.solution.map((step) => step.command),
            );

            const map = {};
            exercise.solution.forEach((step) => {
                map[step.command] = step.output;
            });

            allowedCommandsRef.current = commands;
            commandOutputMapRef.current = map;
        }
    }, [exercise]);

    useEffect(() => {
        if (isFetching) {
            showLoader();
        } else {
            hideLoader();
        }
    }, [isFetching, showLoader, hideLoader]);

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
                <Terminal onCommand={(command) => handleCommand(command)} />
            </div>
        </div>
    );
};

export default Exercise;
