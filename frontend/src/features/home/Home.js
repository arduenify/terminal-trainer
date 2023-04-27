import React from 'react';
import Header from './Header';
import Slogan from './Slogan';
import Carousel from './Carousel';

const exercises = [
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
