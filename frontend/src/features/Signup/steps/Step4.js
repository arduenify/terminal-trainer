import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

const Step4 = ({
    password,
    setPassword,
    passwordConfirmation,
    setPasswordConfirmation,
    passwordsMatch,
    showErrors,
}) => {
    return (
        <div className='fade-in'>
            <h3 className='form-subtitle'>Step 4: Set your Password</h3>
            <div className='form-group'>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className={`form-control ${
                        showErrors && !password ? 'input-invalid' : ''
                    }`}
                    required
                />
                <FontAwesomeIcon icon={faLock} className='input-icon' />
                <div
                    className={`error-message ${
                        showErrors && !password ? 'visible' : ''
                    }`}
                >
                    Please enter a password.
                </div>
            </div>
            <div className='form-group'>
                <input
                    type='password'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder='Confirm Password'
                    className={`form-control ${
                        showErrors &&
                        (!passwordConfirmation || (password && !passwordsMatch))
                            ? 'input-invalid'
                            : ''
                    }`}
                    required
                />
                <FontAwesomeIcon icon={faLock} className='input-icon' />
                <div
                    className={`error-message ${
                        (showErrors &&
                            !passwordsMatch &&
                            passwordConfirmation) ||
                        (showErrors && !passwordConfirmation)
                            ? 'visible'
                            : ''
                    }`}
                >
                    {passwordsMatch
                        ? 'Please confirm your password.'
                        : 'Passwords do not match.'}
                </div>
            </div>
        </div>
    );
};

export default Step4;
