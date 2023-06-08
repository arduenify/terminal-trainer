import React from 'react';
import Slogan from './Slogan';
import Carousel from './Carousel';
import './Home.css';

const HomePage = () => {
    return (
        <div className='home-page-container'>
            <Slogan />
            <Carousel />
            {/* <StatsCounter title={'Title here!'} value={69} /> */}
        </div>
    );
};

export default HomePage;
