import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Header.css';

const Header = () => {
    // Hooks
    const navigate = useNavigate();

    // Callbacks
    const navigateToSignupForm = () => {
        navigate('/signup');
    };

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <header className='header'>
            <div className='header-logo' onClick={navigateToHome}>
                Terminal Trainer
            </div>
            <nav className='header-nav'>
                <div className='header-nav-item'>Exercises</div>
                <div className='header-nav-item'>Badges</div>
                <div className='header-nav-item'>Progress</div>
            </nav>
            <div className='header-buttons'>
                <button className='button button-signin'>Sign In</button>
                <button
                    className='button button-signup'
                    onClick={navigateToSignupForm}
                >
                    Register
                </button>
            </div>
        </header>
    );
};

export default Header;
