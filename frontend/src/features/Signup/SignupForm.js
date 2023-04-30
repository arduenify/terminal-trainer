import React, { useState } from 'react';
import { useSignupUserMutation } from '../../store/api';
import './SignupForm.css';

const SignupForm = () => {
    // Local state
    const [username, setUsername] = useState('');
    const [email, setEmailOrUsername] = useState('');
    const [lastName, setLastName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // Hooks
    const [signupUser, { isLoading, error }] = useSignupUserMutation();

    // Callbacks
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Validate form fields

            const userData = {
                username,
                email,
                password,
                firstName,
                lastName,
            };

            console.log('User Data:', userData);
            // await signupUser({ email, password }).unwrap();
        } catch (err) {
            console.log('Error caught!', err);
        }
    };

    const passwordsMatch = password === passwordConfirmation;

    return (
        <form onSubmit={handleSubmit} className='signup-form' noValidate>
            <div className='form-group'>
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    required
                    minLength={1}
                    className='form-control'
                />
                <div className='error-message'>Username must not be empty.</div>
            </div>
            <div className='form-group'>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    placeholder='Email'
                    required
                    pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                    className='form-control'
                />
                <div className='error-message'>Please enter a valid email.</div>
            </div>
            <div className='form-group'>
                <input
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder='First Name'
                    required
                    className='form-control'
                />
                <div className='error-message'>
                    Please enter your first name.
                </div>
            </div>
            <div className='form-group'>
                <input
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Last Name'
                    required
                    className='form-control'
                />
                <div className='error-message'>
                    Please enter your last name.
                </div>
            </div>
            <div className='form-group'>
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    required
                    className='form-control'
                />
                <div className='error-message'>Please enter a password.</div>
            </div>
            <div className='form-group'>
                <input
                    type='password'
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    placeholder='Confirm Password'
                    required
                    minLength='8'
                    className={`form-control ${
                        passwordConfirmation && !passwordsMatch
                            ? 'is-invalid'
                            : ''
                    }`}
                />
                <div className='error-message'>
                    {passwordsMatch
                        ? 'Please confirm your password.'
                        : 'Passwords do not match.'}
                </div>
            </div>
            <button
                type='submit'
                disabled={isLoading || !passwordsMatch}
                className='submit-btn'
            >
                Sign Up
            </button>
            {error && <div>Error: {error.message}</div>}
        </form>
    );
};

export default SignupForm;
