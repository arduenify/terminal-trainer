import React, { useCallback, useEffect, useContext } from 'react';
import NotificationContext from './context/NotificationContext';
import './Notification.css';

const Notification = ({ title, text, duration = 3000 }) => {
    const { dismissNotification } = useContext(NotificationContext);

    const clearTimer = useCallback((timerId) => {
        if (timerId) {
            clearTimeout(timerId);
        }
    }, []);

    useEffect(() => {
        const newTimer = setTimeout(() => {
            dismissNotification();
        }, duration);

        return () => clearTimer(newTimer);
    }, [duration, dismissNotification, clearTimer]);

    return (
        <div
            className='notification-container'
            onClick={() => {
                dismissNotification();
                clearTimer();
            }}
        >
            <h4 className='notification-title'>{title}</h4>
            <p className='notification-text'>{text}</p>
        </div>
    );
};

export default Notification;
