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

    // Remove a server error by its "path", aka field name
    const removeErrorByPath = (path) => {
        setServerErrors((prevErrors) =>
            prevErrors.filter((error) => {
                // This can probably be simplified elsewhere
                return error.path
                    ? error.path.toLowerCase() !== path
                    : !error.toLowerCase().includes(path);
            }),
        );
    };

    const inputNames = [
        'firstName',
        'lastName',
        'username',
        'email',
        'password',
        'passwordConfirmation',
    ];

    useEffect(() => {
        inputNames.forEach((inputName) => {
            if (inputs[inputName]) {
                removeErrorByPath(inputName);
            }
        });
    }, [firstName, lastName, username, email, password, passwordConfirmation]);
};
