import React, { useEffect, useState } from 'react';
import './ExerciseCard.css';

const ExerciseCard = ({
    title,
    description,
    difficulty,
    teachingText,
    openExercise,
    index,
    id,
}) => {
    const shortenedDescription =
        description.length > 100
            ? description.slice(0, 100) + '...'
            : description;

    return (
        <div
            className={index % 2 === 0 ? 'exercise-card' : 'exercise-card odd'}
            onClick={() => openExercise(id)}
        >
            <div className='exercise-card-header'>
                <p className={`difficulty ${difficulty.toLowerCase()}`}>
                    {difficulty}
                </p>
            </div>
            <div className='exercise-card-body'>
                <h3 className='title'>{title}</h3>
                <p className='description'>{shortenedDescription}</p>
            </div>
        </div>
    );
};

export default ExerciseCard;
