import HomePage from '../features/home';
import Header from '../features/header';
import { Route, Routes } from 'react-router-dom';
import SignupForm from '../features/signup';
import React, { useContext } from 'react';
import ModernLoader from '../features/modernLoader';
import NotificationContext from '../features/notification/context/NotificationContext';
import Notification from '../features/notification';
import LoginForm from '../features/login';
import ExercisesPage from '../features/exercise/page';
import Exercise from '../features/exercise/Exercise';
import './App.css';
import BadgePage from '../features/badge/page';
import ProgressPage from '../features/progress/page';

function App() {
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
                <Route path='/exercises/:id' element={<Exercise />} />
                <Route path='/badges' element={<BadgePage />} />
                <Route path='/badges/:id' element={<div>Todo</div>} />
                <Route path='/progress/' element={<ProgressPage />} />
            </Routes>
            <ModernLoader />
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
