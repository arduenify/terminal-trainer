import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Step3 = ({ email, setEmail, showErrors, isValidEmail }) => {
    const emailRef = useRef(null);

    // set the email input as active upon render
    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    return (
        <div className='fade-in'>
            <h3 className='form-subtitle'>Step 3: Enter your Email</h3>
            <div className='form-group'>
                <div className='input-container'>
                    <input
                        type='email'
                        ref={emailRef}
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
                </div>
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
