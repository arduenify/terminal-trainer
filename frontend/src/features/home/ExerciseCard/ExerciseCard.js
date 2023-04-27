import React from 'react';
import './ExerciseCard.css';

const ExerciseCard = ({ title, description }) => {
    const shortenedDescription =
        description.length > 100
            ? description.slice(0, 100) + '...'
            : description;

    return (
        <div className='exercise-card'>
            <h3 className='exercise-title'>{title}</h3>
            <p className='exercise-description'>{shortenedDescription}</p>
        </div>
    );
};

export default ExerciseCard;
