import { useEffect, useState } from 'react';
import { getStepFromPath } from '../utils';

export const useHandleServerError = (
    serverErrors,
    currentStep,
    setCurrentStep,
) => {
    const [errorMessages, setErrorMessages] = useState([]);

    useEffect(() => {
        if (serverErrors && serverErrors.length > 0) {
            const newErrorMessages = serverErrors.map((error, i) => {
                const message = error.msg || error;
                return <li key={i}>{message}</li>;
            });

            setErrorMessages(newErrorMessages);

            const path =
                serverErrors[0].path ||
                serverErrors[0].split(' ')[0].toLowerCase();
            const firstErrorStep = getStepFromPath(path);

            if (currentStep !== firstErrorStep) {
                setCurrentStep(firstErrorStep);
            }
        } else {
            setErrorMessages([]);
        }
    }, [serverErrors, currentStep, setCurrentStep]);

    return errorMessages;
};
