import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useDemoLoginMutation,
    useFetchCurrentUserQuery,
} from '../../store/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../common/AuthContext';
import NotificationContext from '../notification/context/NotificationContext';
import { setLoading } from '../../store/loadingSlice';
import './Header.css';
import { useDispatch } from 'react-redux';

const Header = () => {
    // Hooks
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const { refetch } = useFetchCurrentUserQuery();
    const [demoLogin] = useDemoLoginMutation();
    const { showNotification } = useContext(NotificationContext);
    const { isAuthenticated, setIsAuthenticated, logout } =
        useContext(AuthContext);
    const dispatch = useDispatch();

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

    const navigateToExercises = () => {
        navigate('/exercises');
    };

    const navigateToBadges = () => {
        navigate('/badges');
    };

    const handleDemoAuthentication = async () => {
        const { data } = await demoLogin();

        if (data) {
            localStorage.setItem('token', data.token);
            await refetch();
            dispatch(setLoading(true));

            const dismissNotificationCallback = () => {
                setIsAuthenticated(true);
                navigateToHome();
                dispatch(setLoading(false));
            };

            showNotification({
                title: 'Welcome!',
                text: 'Thank you for trying out Terminal Trainer! Redirecting you...',
                duration: 2000,
                dismissCallback: dismissNotificationCallback,
            });
        }
    };

    const logoutUser = () => {
        setMenuOpen(false);
        dispatch(setLoading(true));
        logout();
        const dismissNotificationCallback = () => {
            navigateToHome();
            dispatch(setLoading(false));
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
                <div className='header-nav-item' onClick={navigateToHome}>
                    Home
                </div>
                <div className='header-nav-item' onClick={navigateToExercises}>
                    Exercises
                </div>
                <div className='header-nav-item' onClick={navigateToBadges}>
                    Badges
                </div>
                {/* <div className='header-nav-item'>Progress</div>
                {isAuthenticated && (
                    <div className='header-nav-item'>Profile</div>
                )} */}
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
                    <button
                        className='button button-demo'
                        onClick={handleDemoAuthentication}
                    >
                        Demo
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
