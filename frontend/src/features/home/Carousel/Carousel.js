import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
    useCallback,
} from 'react';
import ExerciseCard from '../ExerciseCard';
import { useFetchAllExercisesQuery } from '../../../store/api';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../../store/loadingSlice';
import { useDispatch } from 'react-redux';
import './Carousel.css';

const Carousel = () => {
    const [exercises, setExercises] = useState([]);
    const [translateX, setTranslateX] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [animationSpeedModifier, setAnimationSpeedModifier] =
        useState(0.0225);
    const animationRef = useRef(null);
    const dispatch = useDispatch();

    const {
        data: fetchedExercises,
        isLoading,
        isFetching,
    } = useFetchAllExercisesQuery();

    useEffect(() => {
        if (isFetching || isLoading) {
            dispatch(setLoading(true));
        }
    }, [isFetching, isLoading]);
    const navigate = useNavigate();

    // Animate the carousel movement using a requestAnimationFrame loop and a speed modifier to make the animation smooth
    const animate = useCallback(() => {
        setTranslateX((prevTranslateX) => {
            const newX = prevTranslateX - animationSpeedModifier;
            return newX <= -100 ? 0 : newX;
        });
        animationRef.current = requestAnimationFrame(animate);
    }, [animationSpeedModifier]);

    // Setup the carousel animation
    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, [animate]);

    // Update the local exercise list state when exercises are fetched
    useEffect(() => {
        if (fetchedExercises) {
            setExercises(fetchedExercises.concat(fetchedExercises));
        }
    }, [fetchedExercises]);

    // The exercise list must be "doubled" so as to appear infinite and loop correctly
    const renderedCards = useMemo(() => {
        if (isLoading || !exercises) {
            return null;
        }

        const openExercise = (exerciseId) => {
            const url = `/exercises/${exerciseId}`;
            navigate(url);
        };

        return exercises.map((exercise, index) => (
            <ExerciseCard
                key={`exercise-${index}`}
                {...exercise}
                index={index}
                openExercise={openExercise}
            />
        ));
    }, [isLoading, exercises, navigate]);

    return (
        <div className='carousel-container'>
            <div
                className='carousel'
                style={{
                    transform: `translateX(${translateX}%)`,
                }}
            >
                {renderedCards}
            </div>
        </div>
    );
};

export default Carousel;
