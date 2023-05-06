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

    const allowedCommandsRef = useRef(new Set());
    const commandOutputMapRef = useRef({});

    const finishExercise = () => {
        console.log('Exercise completed!');
        // TODO: Update user progress
    };

    const handleCommand = (command) => {
        const trimmedCommand = command.trim();

        if (allowedCommandsRef.current.has(trimmedCommand)) {
            const lastCommand =
                exercise.solution[exercise.solution.length - 1].command;

            if (trimmedCommand === lastCommand) {
                finishExercise();
            }

            const platformSeparator = navigator.userAgent.includes('Windows')
                ? '\r\n'
                : '\n';

            return commandOutputMapRef.current[trimmedCommand].replace(
                /\n/g,
                platformSeparator,
            );
        } else {
            console.log(allowedCommandsRef.current);
        }

        return `Unknown command: ${trimmedCommand.split(' ')[0]}`;
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
            </div>
            <Terminal onCommand={(command) => handleCommand(command)} />
        </div>
    );
};

export default Exercise;
