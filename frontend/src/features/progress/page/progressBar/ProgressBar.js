import './ProgressBar.css';

const ProgressBar = ({ completed, total }) => {
    const completionPercentage = (completed / total) * 100;

    return (
        <div className='progress-bar-container'>
            <div
                className='progress-bar-fill'
                style={{ width: `${completionPercentage}%` }}
            />
        </div>
    );
};

export default ProgressBar;
