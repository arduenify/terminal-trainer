import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Step2 = ({ username, setUsername, showErrors, firstName }) => {
    const usernameRef = useRef(null);

    // set the username input as active upon render
    useEffect(() => {
        usernameRef.current?.focus();
    }, []);

    return (
        <div className='fade-in'>
            <h3 className='form-subtitle'>
                Hi{firstName ? `, ${firstName}` : ``}! Decide on a username to
                be displayed around the website.{' '}
            </h3>

            <div className='form-group'>
                <div className='input-container'>
                    <input
                        type='text'
                        ref={usernameRef}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                        placeholder='Username'
                        className={`form-control ${
                            showErrors && !username ? 'input-invalid' : ''
                        }`}
                        required
                    />
                    <FontAwesomeIcon icon={faUser} className='input-icon' />
                </div>
                <div
                    className={`error-message ${
                        showErrors && !username ? 'visible' : ''
                    }`}
                >
                    Username must not be empty.
                </div>
            </div>
        </div>
    );
};

export default Step2;
