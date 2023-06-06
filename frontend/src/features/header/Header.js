import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    useDemoLoginMutation,
    useFetchCurrentUserQuery,
} from '../../store/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSearch } from '@fortawesome/free-solid-svg-icons';
import NotificationContext from '../notification/context/NotificationContext';
import { setLoading } from '../../store/loadingSlice';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../common/hooks/useAuth';
import SearchBar from '../search';
import './Header.css';

const Header = () => {
    // Hooks
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchBarOpen, setSearchBarOpen] = useState(false);
    const { refetch } = useFetchCurrentUserQuery();
    const [demoLogin] = useDemoLoginMutation();
    const { showNotification } = useContext(NotificationContext);
    const { isAuthenticated, setIsAuthenticated, logout } = useAuth();
    const dispatch = useDispatch();

    const isActive = (path) => (location.pathname === path ? 'active' : '');

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

    const navigateToProgress = () => {
        navigate('/progress');
    };

    const openSearchBar = () => {
        setSearchBarOpen((state) => !state);
    };

    const onSearchSubmitted = (searchQuery) => {
        setSearchBarOpen(false);
        
        navigate(`/search-results?query=${searchQuery}`);
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
            {searchBarOpen && (
                <SearchBar onSearchSubmitted={onSearchSubmitted} />
            )}
            <div className='header-section'>
                <div className='header-logo' onClick={navigateToHome}>
                    Terminal Trainer
                </div>
            </div>
            <div className='header-section'>
                <nav className='header-nav'>
                    <div
                        className={`header-nav-item ${isActive('/')}`}
                        onClick={navigateToHome}
                    >
                        Home
                    </div>
                    <div
                        className={`header-nav-item ${isActive('/exercises')}`}
                        onClick={navigateToExercises}
                    >
                        Exercises
                    </div>
                    <div
                        className={`header-nav-item ${isActive('/badges')}`}
                        onClick={navigateToBadges}
                    >
                        Badges
                    </div>
                    {isAuthenticated && (
                        <div
                            className={`header-nav-item ${isActive(
                                '/progress',
                            )}`}
                            onClick={navigateToProgress}
                        >
                            Progress
                        </div>
                    )}
                    <div
                        className={`header-nav-item ${isActive('/badges')}`}
                        onClick={openSearchBar}
                    >
                        <FontAwesomeIcon
                            id='search-fa-icon'
                            size='lg'
                            icon={faSearch}
                            className={menuOpen ? 'bounce' : ''}
                        />
                    </div>
                </nav>
            </div>

            <div className='header-section'>
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
            </div>
        </header>
    );
};

export default Header;
