import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchCurrentUserQuery } from '../../store/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useLoader } from '../modernLoader/context';
import AuthContext from '../../common/AuthContext';
import NotificationContext from '../notification/context/NotificationContext';
import './Header.css';

const Header = () => {
    // Hooks
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: user, isFetching, isSuccess } = useFetchCurrentUserQuery();
    const { hideLoader, showLoader } = useLoader();
    const { showNotification } = useContext(NotificationContext);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const userExists = user && user.id && !isFetching && isSuccess;
        setIsAuthenticated(userExists);
    }, [user, isFetching, isSuccess]);

    // Callbacks
    const navigateToSignupForm = () => {
        navigate('/signup');
    };

    const navigateToLoginForm = () => {
        navigate('/login');
    };

    const navigateToHome = () => {
        navigate('/');
    };

    const logoutUser = () => {
        setMenuOpen(false);
        showLoader();

        localStorage.removeItem('token');
        const dismissNotificationCallback = () => {
            hideLoader();
            setIsAuthenticated(false);
        };

        showNotification({
            title: 'Logout successful',
            text: 'Thanks for stopping by!',
            duration: 1500,
            dismissCallback: dismissNotificationCallback,
        });
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
                {isAuthenticated && (
                    <div className='header-nav-item'>Profile</div>
                )}
            </nav>
            {isAuthenticated ? (
                <div className='profile-menu'>
                    <div
                        className='profile-menu-button'
                        onClick={() => setMenuOpen((state) => !state)}
                    >
                        <div className='profile-menu-button-label'>
                            <FontAwesomeIcon
                                id='user-fa-icon'
                                size='xl'
                                icon={faUser}
                                className={menuOpen ? 'bounce' : ''}
                            />
                        </div>
                    </div>
                    {menuOpen && (
                        <div className='profile-menu-content'>
                            {/* <div className='profile-menu-item'>Profile</div>
                            <div className='profile-menu-item'>Settings</div> */}
                            <div
                                className='profile-menu-item'
                                onClick={logoutUser}
                            >
                                Log out
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className='header-buttons'>
                    <button
                        className='button button-signin'
                        onClick={navigateToLoginForm}
                    >
                        Sign In
                    </button>
                    <button
                        className='button button-signup'
                        onClick={navigateToSignupForm}
                    >
                        Register
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
