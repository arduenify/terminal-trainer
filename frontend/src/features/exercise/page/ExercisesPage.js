import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useDeleteExerciseByIdMutation,
    useFetchAllExercisesQuery,
} from '../../../store/api';
import AdminPanel from './adminPanel';
import {
    useCreateExerciseMutation,
    useUpdateExerciseByIdMutation,
} from '../../../store/api';
import NotificationContext from '../../notification/context/NotificationContext';
import './ExercisesPage.css';
import { useAuth } from '../../../common/hooks/useAuth';

const ExercisePage = () => {
    // Hooks
    const { data: exercises } = useFetchAllExercisesQuery();

    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [createExercise] = useCreateExerciseMutation();
    const [updateExerciseById] = useUpdateExerciseByIdMutation();
    const [deleteExerciseById] = useDeleteExerciseByIdMutation();
    const [validationError, setValidationError] = useState('');
    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        if (isAddModalOpen || isEditModalOpen) {
            document.body.classList.add('body-no-scroll');
        } else {
            document.body.classList.remove('body-no-scroll');
        }

        return () => {
            document.body.classList.remove('body-no-scroll');
        };
    }, [isAddModalOpen, isEditModalOpen]);

    // Callbacks
    const openExercise = (exercise) => {
        const url = `/exercises/${exercise.id}`;

        navigate(url);
    };

    const openEditModal = (exercise) => {
        setSelectedExercise(exercise);
        setEditModalOpen(true);
    };

    const openDeleteModal = (exercise) => {
        setSelectedExercise(exercise);
        setDeleteModalOpen(true);
    };

    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);
    const closeEditModal = () => setEditModalOpen(false);
    const closeDeleteModal = () => setDeleteModalOpen(false);

    const handleAddExercise = async (exercise) => {
        const resultAction = await createExercise(exercise);

        if (resultAction.error) {
            showNotification({
                title: 'Create Exercise Failed',
                text: 'An error occurred while trying to create this exercise. Please try again.',
            });
        } else {
            showNotification({
                title: 'Exercise Created',
                text: 'Exercise was successfully created.',
            });
        }

        closeAddModal();
    };

    const handleUpdateExercise = async (exercise) => {
        const resultAction = await updateExerciseById({
            id: selectedExercise.id,
            exercise,
        });

        if (resultAction.error) {
            showNotification({
                title: 'Update Exercise Failed',
                text: 'An error occurred while trying to update this exercise. Please try again.',
            });

            if (resultAction.error.data.error === 'Validation error') {
                setValidationError(resultAction.error.data.error);
            }
        } else {
            showNotification({
                title: 'Exercise Updated',
                text: 'Exercise was successfully updated.',
            });
            closeEditModal();
        }
    };

    const handleDeleteExercise = async () => {
        const resultAction = await deleteExerciseById(selectedExercise.id);

        if (resultAction.error) {
            showNotification({
                title: 'Exercise Update Failed',
                text: 'An error occurred while trying to delete this exercise. Please try again.',
            });
        } else {
            showNotification({
                title: 'Exercise Deleted',
                text: 'Exercise was successfully deleted.',
            });
        }

        setDeleteModalOpen(false);
    };

    return (
        <div className='exercises-page-container'>
            <h1>Exercises</h1>

            {isAdmin && (
                <AdminPanel
                    openAddModal={openAddModal}
                    closeAddModal={closeAddModal}
                    openEditModal={openEditModal}
                    closeEditModal={closeEditModal}
                    selectedExercise={selectedExercise}
                    handleAddExercise={handleAddExercise}
                    handleUpdateExercise={handleUpdateExercise}
                    handleDeleteExercise={handleDeleteExercise}
                    isAddModalOpen={isAddModalOpen}
                    isEditModalOpen={isEditModalOpen}
                    isDeleteModalOpen={isDeleteModalOpen}
                    closeDeleteModal={closeDeleteModal}
                    validationError={validationError}
                />
            )}

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
                                <button
                                    className='button button-primary'
                                    onClick={() => openExercise(exercise)}
                                >
                                    Try it out
                                </button>
                            </div>
                            {isAdmin && (
                                <div className='admin-actions-container'>
                                    <h3>Administrator Panel</h3>
                                    <div className='admin-actions'>
                                        <button
                                            className='edit-button'
                                            onClick={() =>
                                                openEditModal(exercise)
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            className='delete-button'
                                            onClick={() =>
                                                openDeleteModal(exercise)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ExercisePage;
