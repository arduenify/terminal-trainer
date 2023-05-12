import React from 'react';
import Slogan from './Slogan';
import Carousel from './Carousel';
// import StatsCounter from './statsCounter';

const HomePage = () => {
    return (
        <>
            <Slogan />
            <Carousel />
            {/* <StatsCounter title={'Title here!'} value={69} /> */}
        </>
    );
};

export default HomePage;
