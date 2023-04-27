import React, { useState, useEffect, useRef } from 'react';
import ExerciseCard from '../ExerciseCard';
import './Carousel.css';

const Carousel = ({ exercises }) => {
    const [translateX, setTranslateX] = useState(0);
    const [animationSpeedModifier, setAnimationSpeedModifier] = useState(0.025);
    const animationRef = useRef(null);

    //
    const animate = () => {
        setTranslateX((prevTranslateX) => {
            const newX = prevTranslateX - animationSpeedModifier;
            return newX <= -100 ? 0 : newX;
        });
        animationRef.current = requestAnimationFrame(animate);
    };

    // Setup the carousel animation
    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    const renderCards = () => {
        const allCards = exercises.concat(exercises);
        return allCards.map((exercise, index) => (
            <ExerciseCard key={`exercise-${index}`} {...exercise} />
        ));
    };

    return (
        <div className='carousel-container'>
            <div
                className='carousel'
                style={{
                    transform: `translateX(${translateX}%)`,
                }}
            >
                {renderCards()}
            </div>
        </div>
    );
};

export default Carousel;
