import Modal from '../../../modal';
import { useState } from 'react';
import './ProgressDetail.css';

const ProgressDetail = ({ progress, exercise, onDelete }) => {
    const [showModal, setShowModal] = useState(false);

    const formatSeconds = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - hours * 3600) / 60);
        const remainderSeconds = seconds - hours * 3600 - minutes * 60;

        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = remainderSeconds.toString().padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    const handleDelete = () => {
        onDelete(progress.id);
        setShowModal(false);
    };

    const openDeleteModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className='progress-detail'>
            <h4>
                {exercise.title}
                <button
                    className='delete-button'
                    onClick={() => openDeleteModal()}
                >
                    X
                </button>
            </h4>

            <p>Score: {progress.score}</p>
            <p>Hints Used: {progress.hintsUsed}</p>
            <p>Time Spent: {formatSeconds(progress.timeSpent)}</p>
            <p>Status: {progress.completed ? 'Completed' : 'Started'}</p>

            <Modal show={showModal} handleClose={closeModal}>
                <p className='no-before'>
                    Are you sure you want to delete your progress?
                </p>
                <button
                    className='button button-danger'
                    onClick={handleDelete}
                    type='button'
                >
                    Delete
                </button>
            </Modal>
        </div>
    );
};

export default ProgressDetail;
