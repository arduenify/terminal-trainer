import './ProgressDetail.css';

const ProgressDetail = ({ progress, exercise }) => {
    return (
        <div className='progress-detail'>
            <h4>{exercise.title}</h4>
            <p>Score: {progress.score}</p>
            <p>Hints Used: {progress.hintsUsed}</p>
            <p>Time Spent: {progress.timeSpent}</p>
            <p>Status: {progress.completed ? 'Completed' : 'Started'}</p>
        </div>
    );
};

export default ProgressDetail;
