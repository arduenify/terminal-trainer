import {
    useFetchAllExercisesQuery,
    useFetchUserProgressQuery,
} from '../../../store/api';
import ProgressBar from './progressBar';
import ProgressDetail from './progressDetail';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../common/hooks/useAuth';
import './ProgressPage.css';

const ProgressPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { data: progress } = useFetchUserProgressQuery();
    const { data: exercises } = useFetchAllExercisesQuery();

    if (!isAuthenticated) {
        navigate('/');
    }

    if (!progress || !exercises) {
        return;
    }

    const completedExercises = progress.filter(
        (exercise) => exercise.completed,
    );

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
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressPage;
