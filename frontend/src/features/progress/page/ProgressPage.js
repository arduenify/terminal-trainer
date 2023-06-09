import {
    useDeleteProgressByIdMutation,
    useFetchAllExercisesQuery,
    useFetchUserProgressQuery,
} from '../../../store/api';
import ProgressBar from './progressBar';
import ProgressDetail from './progressDetail';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/hooks/useAuth';
import { useEffect, useContext } from 'react';
import NotificationContext from '../../notification/context/NotificationContext';
import './ProgressPage.css';

const ProgressPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { data: progress } = useFetchUserProgressQuery();
    const { data: exercises } = useFetchAllExercisesQuery();
    const [deleteProgressById] = useDeleteProgressByIdMutation();
    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);

    if (!progress || !exercises) {
        return;
    }

    const completedExercises = progress.filter(
        (exercise) => exercise.completed,
    );

    const onDeleteProgress = async (progressId) => {
        const deleteActionResult = await deleteProgressById(progressId);

        if ('error' in deleteActionResult) {
            showNotification({
                title: 'Error',
                message:
                    deleteActionResult.error ||
                    'We were unable to delete your progress, for some reason... 🤔',
            });
            return;
        }

        showNotification({
            title: 'Progress reversed!',
            message: 'Your progress for this exercise has been removed.',
        });
    };

    return (
        <div className='progress-page-container'>
            <h1>Progress</h1>

            <div className='progress-page-overview'>
                <div className='progress-page-totals'>
                    <h3>{completedExercises.length} Completed</h3>
                    <h3>
                        {exercises.length - completedExercises.length} Remaining
                    </h3>
                </div>
                <ProgressBar
                    completed={completedExercises.length}
                    total={exercises.length}
                />
            </div>

            <div className='progress-page-list'>
                {progress.map((progress) => {
                    const exercise = exercises.find(
                        (exercise) => exercise.id === progress.exerciseId,
                    );

                    return (
                        <ProgressDetail
                            key={progress.id}
                            progress={progress}
                            exercise={exercise}
                            onDelete={onDeleteProgress}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressPage;
