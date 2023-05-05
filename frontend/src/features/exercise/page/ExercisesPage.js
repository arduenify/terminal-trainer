import { useContext, useEffect } from 'react';
import { useFetchAllExercisesQuery } from '../../../store/api';
import AuthContext from '../../../common/AuthContext';
import { useLoader } from '../../modernLoader/context/LoaderContext';
import AdminPanel from './adminPanel';
import './ExercisesPage.css';

const ExercisePage = () => {
    // Hooks
    const {
        data: exercises,
        isSuccess,
        isFetching,
        isLoading,
    } = useFetchAllExercisesQuery();

    const { isAdmin } = useContext(AuthContext);
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        if (isFetching || isLoading) {
            showLoader();
        } else {
            hideLoader();
        }
    }, [isFetching, isLoading, showLoader, hideLoader]);

    // Callbacks
    const openEditModal = () => {};
    const openDeleteModal = () => {};

    return (
        <div className='exercises-page-container'>
            <h1>Exercises</h1>
            <div className='exercises-page'>
                {exercises &&
                    exercises.map((exercise) => (
                        <div key={exercise.id} className='exercises-card'>
                            <h2>{exercise.title}</h2>
                            <p>{exercise.description}</p>
                            <div className='exercises-info'>
                                <span
                                    className={`exercises-difficulty ${exercise.difficulty.toLowerCase()}`}
                                >
                                    {exercise.difficulty}
                                </span>
                                <button className='button button-primary'>
                                    Try it out
                                </button>
                            </div>
                            {isAdmin && (
                                <div className='admin-actions'>
                                    <button onClick={openEditModal}>
                                        Edit
                                    </button>
                                    <button onClick={openDeleteModal}>
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
            {isAdmin && <AdminPanel />}
        </div>
    );
};

export default ExercisePage;
