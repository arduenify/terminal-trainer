import './ProgressDetail.css';

const ProgressDetail = ({ progress, exercise }) => {
    const seconds = progress.timeSpent;

    const formatSeconds = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - hours * 3600) / 60);
        const remainderSeconds = seconds - hours * 3600 - minutes * 60;

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainderSeconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <div className='progress-detail'>
            <h4>{exercise.title}</h4>
            <p>Score: {progress.score}</p>
            <p>Hints Used: {progress.hintsUsed}</p>
            <p>Time Spent: {formatSeconds(progress.timeSpent)}</p>
            <p>Status: {progress.completed ? 'Completed' : 'Started'}</p>
        </div>
    );
};

export default ProgressDetail;
