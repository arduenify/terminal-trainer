import React from 'react';
import Terminal from './terminal';

import './Exercise.css';

const Exercise = () => {
    const handleCommand = (input) => {
        // Process the command input
        // Return the output or an empty string if no output
        return 'This is a sample output.';
    };

    return (
        <div className='exercise-container'>
            <Terminal onCommand={handleCommand} />
        </div>
    );
};

export default Exercise;
