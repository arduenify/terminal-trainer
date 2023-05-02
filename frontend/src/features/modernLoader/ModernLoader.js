import React from 'react';
import './ModernLoader.css';

const ModernLoader = ({ show }) => {
    return (
        <div className={`modern-loader-container ${show ? 'visible' : ''}`}>
            <div className='modern-loader'>
                <div className='spinner'></div>
            </div>
        </div>
    );
};

export default ModernLoader;
