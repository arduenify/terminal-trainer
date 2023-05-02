import React, { useEffect, useState } from 'react';
import './ExerciseCard.css';

const ExerciseCard = ({
    title,
    description,
    difficulty,
    teachingText,
    index,
}) => {
    const shortenedDescription =
        description.length > 100
            ? description.slice(0, 100) + '...'
            : description;
    const [difficultyClassName, setDifficultyClassName] = useState(
        'difficulty beginner',
    );

    useEffect(() => {
        if (difficulty === 'easy') {
            setDifficultyClassName('difficulty easy');
        } else if (difficulty === 'intermediate') {
            setDifficultyClassName('difficulty medium');
        } else if (difficulty === 'advanced') {
            setDifficultyClassName('difficulty hard');
        }
    }, [difficulty]);

    return (
        <div
            className={index % 2 === 0 ? 'exercise-card' : 'exercise-card odd'}
        >
            <div className='exercise-card-header'>
                <p className={difficultyClassName}>{difficulty}</p>
            </div>
            <div className='exercise-card-body'>
                <h3 className='title'>{title}</h3>
                <p className='description'>{shortenedDescription}</p>
            </div>
        </div>
    );
};

export default ExerciseCard;
