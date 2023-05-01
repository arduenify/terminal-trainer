import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Step3 = ({ email, setEmail, showErrors, isValidEmail }) => {
    return (
        <div className='fade-in'>
            <h3 className='form-subtitle'>Step 3: Enter your Email</h3>
            <div className='form-group'>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    className={`form-control ${
                        showErrors && (!email || !isValidEmail(email))
                            ? 'input-invalid'
                            : ''
                    }`}
                    required
                />
                <FontAwesomeIcon icon={faEnvelope} className='input-icon' />
                <div
                    className={`error-message ${
                        showErrors && (!email || !isValidEmail(email))
                            ? 'visible'
                            : ''
                    }`}
                >
                    Please enter a valid email.
                </div>
            </div>
        </div>
    );
};

export default Step3;
