import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Step2 = ({ username, setUsername, showErrors }) => {
    return (
        <div className='fade-in'>
            <h3 className='form-subtitle'>Step 2: Choose a Username</h3>
            <div className='form-group'>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    className={`form-control ${
                        showErrors && !username ? 'input-invalid' : ''
                    }`}
                    required
                />
                <FontAwesomeIcon icon={faUser} className='input-icon' />
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
