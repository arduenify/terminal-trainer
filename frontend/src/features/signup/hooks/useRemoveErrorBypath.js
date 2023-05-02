import { useEffect } from 'react';

export const useRemoveErrorByPath = (inputs, setServerErrors) => {
    const {
        firstName,
        lastName,
        username,
        email,
        password,
        passwordConfirmation,
    } = inputs;

    const removeErrorByPath = (path) => {
        setServerErrors((prevErrors) =>
            prevErrors.filter((error) => {
                if (error.path) {
                    return (error.path || '').toLowerCase() !== path;
                } else {
                    return !error.toLowerCase().includes(path);
                }
            }),
        );
    };

    useEffect(() => {
        if (firstName) removeErrorByPath('firstName');
        if (lastName) removeErrorByPath('lastName');
        if (username) removeErrorByPath('username');
        if (email) removeErrorByPath('email');
        if (password) removeErrorByPath('password');
        if (passwordConfirmation) removeErrorByPath('passwordConfirmation');
    }, [firstName, lastName, username, email, password, passwordConfirmation]);
};
