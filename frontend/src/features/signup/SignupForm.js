import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignupUserMutation } from '../../store/api';
import Notification from '../notification';
import { Step1, Step2, Step3, Step4 } from './steps';
import { useHandleServerError } from './hooks/useHandleServerError';
import { useRemoveErrorByPath } from './hooks/useRemoveErrorBypath';
import { isValidEmail } from './utils';
import FormNavigation from './components/FormNavigation';
import { useLoader } from '../modernLoader/context';
import NotificationContext from '../notification/context/NotificationContext';

import './SignupForm.css';

const SignupForm = () => {
    // Local state
    const [currentStep, setCurrentStep] = useState(1);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const [serverErrors, setServerErrors] = useState([]);

    // Hooks and variables
    const { hideLoader, showLoader } = useLoader();
    const { showNotification } = useContext(NotificationContext);
    const passwordsMatch = password === passwordConfirmation;
    const [signupUser] = useSignupUserMutation();
    const navigate = useNavigate();
    const errorMessages = useHandleServerError(
        serverErrors,
        currentStep,
        setCurrentStep,
    );
    useRemoveErrorByPath(
        {
            firstName,
            lastName,
            username,
            email,
            password,
            passwordConfirmation,
        },
        setServerErrors,
    );

    // Event handlers
    const handleSignup = async () => {
        if (currentStep !== 4) {
            setShowErrors(true);
            return;
        }

        const userData = {
            username,
            email,
            password,
            firstName,
            lastName,
        };

        showLoader();
        const resultAction = await signupUser(userData);

        if (resultAction.error) {
            setServerErrors(
                Array.isArray(resultAction.error.data)
                    ? resultAction.error.data
                    : [resultAction.error.data.error],
            );
        } else {
            setServerErrors([]);

            const handleNotificationDismiss = () => {
                navigate('/');
                hideLoader();
            };

            showNotification({
                title: 'Success',
                text: `Your account has been created!`,
                dismissCallback: handleNotificationDismiss,
            });
        }
    };

    const handleNext = () => {
        let stepValid = false;

        switch (currentStep) {
            case 1:
                stepValid = firstName && lastName;
                break;
            case 2:
                stepValid = username;
                break;
            case 3:
                stepValid = email && isValidEmail(email);
                break;
            case 4:
                stepValid = password && passwordConfirmation && passwordsMatch;
                break;
            default:
                stepValid = true;
                break;
        }

        if (currentStep === 4 && stepValid) {
            return handleSignup();
        }

        if (stepValid) {
            setShowErrors(false);
            setCurrentStep((currentStep) => currentStep + 1);
        } else {
            setShowErrors(true);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep((currentStep) => currentStep - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        showErrors={showErrors}
                    />
                );
            case 2:
                return (
                    <Step2
                        username={username}
                        setUsername={setUsername}
                        showErrors={showErrors}
                    />
                );
            case 3:
                return (
                    <Step3
                        email={email}
                        setEmail={setEmail}
                        showErrors={showErrors}
                        isValidEmail={isValidEmail}
                    />
                );
            case 4:
                return (
                    <Step4
                        password={password}
                        setPassword={setPassword}
                        passwordConfirmation={passwordConfirmation}
                        setPasswordConfirmation={setPasswordConfirmation}
                        passwordsMatch={passwordsMatch}
                        showErrors={showErrors}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <form
            className='signup-form fade-in'
            noValidate
            onKeyDown={(event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    event.stopPropagation();
                    handleNext();
                }
            }}
        >
            <h2 className='form-title'>Become a Terminal Pro</h2>
            {renderStep()}
            {errorMessages.length > 0 && (
                <ul className='error-message visible'>{errorMessages}</ul>
            )}
            <FormNavigation
                currentStep={currentStep}
                handleNext={handleNext}
                handlePrevious={handlePrevious}
            />
        </form>
    );
};

export default SignupForm;
