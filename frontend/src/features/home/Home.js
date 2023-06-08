import React from 'react';
import Slogan from './Slogan';
import Carousel from './Carousel';
import ProgressDisplay from './progressDisplay';
import './Home.css';

const HomePage = () => {
    return (
        <div className='home-page-container'>
            <Slogan />
            <Carousel />
            <ProgressDisplay />
        </div>
    );
};

export default HomePage;
