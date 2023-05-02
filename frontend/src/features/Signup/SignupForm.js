import React, { useEffect, useState } from 'react';
import { useSignupUserMutation } from '../../store/api';
import isEmail from 'validator/lib/isEmail';
import './SignupForm.css';
import Step1 from './steps/Step1';
import Step2 from './steps/Step2';
import Step3 from './steps/Step3';
import Step4 from './steps/Step4';

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
    const [errorMessages, setErrorMessages] = useState([]);

    // Hooks
    const [signupUser] = useSignupUserMutation();

    useEffect(() => {
        /*
            This has to be done this way to ensure error messages render correctly.
            
            Previously, error messages would not render when we automatically send the user to the step with the first error, because the error message wasn't part of our component's state yet (we were asynchronously updating it)
        */
        if (serverErrors && serverErrors.length > 0) {
            const newErrorMessages = serverErrors.map((error, i) => {
                const { msg } = error;
                return <li key={i}>{msg}</li>;
            });

            setErrorMessages(newErrorMessages);

            const firstErrorStep = getStepFromPath(serverErrors[0].path);
            if (currentStep !== firstErrorStep) {
                setCurrentStep(firstErrorStep);
            }
        } else {
            setErrorMessages([]);
        }
    }, [serverErrors, currentStep, setCurrentStep]);

    // Callbacks
    const handleSignup = async () => {
        // validation
        if (
            currentStep !== 4 ||
            !username ||
            !email ||
            !firstName ||
            !lastName ||
            !password ||
            !passwordConfirmation ||
            !passwordsMatch
        ) {
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

        // dispatch request
        const resultAction = await signupUser(userData);

        // handle response
        if (resultAction.error) {
            // Handle server errors
            const resultErrors = resultAction.error.data;
            if (resultErrors) {
                setServerErrors(resultErrors);
                setShowErrors(true);
            } else {
                setServerErrors([]);
                setShowErrors(true);
            }
        } else {
            // Redirect to dashboard TODO
        }
    };

    // 'Next' button is pressed
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

    const passwordsMatch = password === passwordConfirmation;
    const isValidEmail = (value) => isEmail(value);

    // Render helpers for progressive signup form
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

    const getStepFromPath = (path) => {
        let step;

        switch (path) {
            case 'firstName':
            case 'lastName':
                // setCurrentStep(1);
                step = 1;
                break;
            case 'username':
                // setCurrentStep(2);
                step = 2;
                break;
            case 'email':
                // setCurrentStep(3);
                step = 3;
                break;
            case 'password':
            case 'passwordConfirmation':
                // setCurrentStep(4);
                step = 4;
                break;
            default:
                break;
        }

        return step || 4;
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
            <div className='form-navigation'>
                <button
                    type='button'
                    onClick={handlePrevious}
                    id='prev-button'
                    className='button button-primary'
                    disabled={currentStep === 1}
                    hidden={currentStep === 1}
                >
                    Previous
                </button>
                <button
                    type='button'
                    onClick={handleNext}
                    id='next-button'
                    className='button button-primary'
                    style={currentStep === 1 ? { width: '100%' } : {}}
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default SignupForm;
