import React, { useCallback, useEffect } from 'react';
import './Notification.css';

const Notification = ({ title, text, duration = 3000, onDismiss }) => {
    // const [timer, setTimer] = useState(null);

    // the callback allows for manual clearing of the timer
    const clearTimer = useCallback((timerId) => {
        if (timerId) {
            clearTimeout(timerId);
        }
    }, []);

    useEffect(() => {
        const newTimer = setTimeout(() => {
            onDismiss();
        }, duration);

        return () => clearTimer(newTimer);
    }, [duration, onDismiss, clearTimer]);

    return (
        <div
            className='notification-container'
            onClick={() => {
                onDismiss();
                clearTimer();
            }}
        >
            <h4 className='notification-title'>{title}</h4>
            <p className='notification-text'>{text}</p>
        </div>
    );
};

export default Notification;
