import isEmail from 'validator/lib/isEmail';

export const isValidEmail = (value) => isEmail(value);

export const getStepFromPath = (path) => {
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
