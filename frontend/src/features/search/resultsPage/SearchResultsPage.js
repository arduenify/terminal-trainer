import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetchAllExercisesQuery } from '../../../store/api';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query').trim();
    const { data: exercises } = useFetchAllExercisesQuery();
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!exercises?.length) return;

        const lowerCaseQuery = query ? query.toLowerCase() : '';
        const newFilteredExercises = exercises.filter((exercise) => {
            const matchQuery = [
                'title',
                'description',
                'teachingText',
                'difficulty',
            ].some((field) => {
                return exercise[field].toLowerCase().includes(lowerCaseQuery);
            });
            const matchDifficulty = selectedDifficulty
                ? exercise.difficulty === selectedDifficulty
                : true;
            return matchQuery && matchDifficulty;
        });

        setFilteredExercises(newFilteredExercises);
    }, [query, exercises, selectedDifficulty]);

    useEffect(() => {
        if (filteredExercises.length > 0) {
            setLoaded(true);
        }
    }, [filteredExercises]);

    const navigateToExerciseById = (id) => {
        navigate(`/exercises/${id}`);
    };

    const filteredExercisesLength = filteredExercises?.length > 0;

    return (
        <div className='search-results-page-container'>
            <div className='search-results-page'>
                <h1 className='search-results-title'>Search results</h1>
                <div className='search-term-title-row'>
                    <h2 className='search-term-title'>
                        Your search query: {query}
                    </h2>

                    <div className='filter-section'>
                        <label htmlFor='difficulty' className='filter-label'>
                            Filter by difficulty:
                        </label>
                        <select
                            id='difficulty'
                            className='filter-select'
                            value={selectedDifficulty}
                            onChange={(e) =>
                                setSelectedDifficulty(e.target.value)
                            }
                        >
                            <option value=''>All</option>
                            <option value='beginner'>Beginner</option>
                            <option value='intermediate'>Intermediate</option>
                            <option value='advanced'>Advanced</option>
                        </select>
                    </div>
                </div>

                <div
                    className={`search-results-section ${
                        loaded ? 'loaded' : ''
                    }`}
                    key={query}
                >
                    {filteredExercisesLength &&
                        filteredExercises.map((exercise, index) => (
                            <div
                                className='search-result-item'
                                key={exercise.id}
                                onClick={() =>
                                    navigateToExerciseById(exercise.id)
                                }
                            >
                                <h3 className='exercise-title'>
                                    {exercise.title}
                                </h3>
                                <p className='exercise-description'>
                                    {exercise.description}
                                </p>
                                <p
                                    className={`exercise-difficulty ${exercise.difficulty.toLowerCase()}`}
                                >
                                    {exercise.difficulty.toUpperCase()}
                                </p>
                                {index < filteredExercises.length - 1 && (
                                    <hr className='result-separator' />
                                )}
                            </div>
                        ))}
                    {!filteredExercisesLength && (
                        <p className='no-results-message'>
                            Sorry, no results were found for that query. Please
                            try another.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResultsPage;
