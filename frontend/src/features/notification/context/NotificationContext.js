import React, { createContext, useState } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);

    const showNotification = (notification) => {
        setNotification(notification);
    };

    const dismissNotification = () => {
        if (notification && notification.dismissCallback) {
            notification.dismissCallback();
        }
        setNotification(null);
    };

    return (
        <NotificationContext.Provider
            value={{
                notification: notification && {
                    title: notification.title,
                    text: notification.text,
                    duration: notification.duration,
                },
                showNotification,
                dismissNotification,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext;
