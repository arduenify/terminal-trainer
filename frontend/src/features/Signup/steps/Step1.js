import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Step1 = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    showErrors,
}) => {
    const firstNameRef = useRef(null);

    // set the first name input as active upon render
    useEffect(() => {
        firstNameRef.current?.focus();
    }, []);

    return (
        <div className='fade-in'>
            <h3 className='form-subtitle'>Step 1: Enter your Name</h3>
            <div className='form-group'>
                <div className='input-container'>
                    <input
                        type='text'
                        value={firstName}
                        ref={firstNameRef}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder='First Name'
                        className={`form-control${
                            showErrors && !firstName ? ' input-invalid' : ''
                        }`}
                        required
                    />
                    <FontAwesomeIcon icon={faUser} className='input-icon' />
                </div>
                <div
                    className={`error-message ${
                        showErrors && !firstName ? ' visible' : ''
                    }`}
                >
                    Please enter your first name.
                </div>
            </div>
            <div className='form-group'>
                <div className='input-container'>
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder='Last Name'
                        className={`form-control ${
                            showErrors && !lastName ? 'input-invalid' : ''
                        }`}
                        required
                    />
                    <FontAwesomeIcon icon={faUser} className='input-icon' />
                </div>
                <div
                    className={`error-message ${
                        showErrors && !lastName ? 'visible' : ''
                    }`}
                >
                    Please enter your last name.
                </div>
            </div>
        </div>
    );
};

export default Step1;
