import React, { useEffect } from 'react';
import Header from '../header';
import Slogan from './Slogan';
import Carousel from './Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExercises } from '../../store/exerciseSlice';

const demoExercises = [
    {
        title: 'Print Working Directory',
        description: 'Print the path to the current working directory.',
    },
    {
        title: 'Change Directory',
        description:
            'Change the current working directory to your home directory.',
    },
    {
        title: 'List',
        description: 'List the contents of a directory.',
    },
    {
        title: 'Print Working Directory',
        description: 'Print the path to the current working directory.',
    },
    {
        title: 'Change Directory',
        description:
            'Change the current working directory to your home directory.',
    },
];

const HomePage = () => {
    const dispatch = useDispatch();
    const exercises = useSelector((state) => state.exercise.data);
    const status = useSelector((state) => state.exercise.status);
    const error = useSelector((state) => state.exercise.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllExercises());
        }
    }, [status, dispatch]);

    return (
        <>
            <Header />
            <Slogan />
            <Carousel exercises={exercises} />
            {/* Carousel and Progress Stats here */}
        </>
    );
};

export default HomePage;
