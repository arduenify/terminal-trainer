import HomePage from '../features/home';
import Header from '../features/header';
import { Route, Routes } from 'react-router-dom';
import SignupForm from '../features/signup';
import React, { useContext } from 'react';
import { useLoader } from '../features/modernLoader/context';
import ModernLoader from '../features/modernLoader';
import NotificationContext from '../features/notification/context/NotificationContext';
import Notification from '../features/notification';
import LoginForm from '../features/login';
import ExercisesPage from '../features/exercise/page';
import './App.css';

function App() {
    const { loading } = useLoader();
    const { notification, dismissNotification } =
        useContext(NotificationContext);

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signup' element={<SignupForm />} />
                <Route path='/login' element={<LoginForm />} />
                <Route path='/exercises' element={<ExercisesPage />} />
            </Routes>
            <ModernLoader show={loading} />
            {notification && (
                <Notification
                    title={notification.title}
                    text={notification.text}
                    duration={notification.duration}
                    onDismiss={dismissNotification}
                />
            )}
        </>
    );
}

export default App;
