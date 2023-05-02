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
                let msg = error;

                if (error.msg) {
                    msg = error.msg;
                }

                return <li key={i}>{msg}</li>;
            });

            setErrorMessages(newErrorMessages);

            let path = serverErrors[0].path;
            if (!path) {
                const firstWord = serverErrors[0].split(' ')[0].toLowerCase();
                path = firstWord;
            }
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
