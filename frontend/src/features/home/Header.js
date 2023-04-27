import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className='header'>
            <div className='header-logo'>Terminal Trainer</div>
            <nav className='header-nav'>
                <div className='header-nav-item'>Exercises</div>
                <div className='header-nav-item'>Badges</div>
                <div className='header-nav-item'>Progress</div>
            </nav>
            <div className='header-buttons'>
                <button className='button button-primary'>Sign In</button>
                <button className='button button-secondary'>Register</button>
            </div>
        </header>
    );
};

export default Header;
