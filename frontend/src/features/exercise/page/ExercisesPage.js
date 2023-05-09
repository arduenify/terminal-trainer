import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    useDeleteExerciseByIdMutation,
    useFetchAllExercisesQuery,
} from '../../../store/api';
import AuthContext from '../../../common/AuthContext';
import { useLoader } from '../../modernLoader/context/LoaderContext';
import AdminPanel from './adminPanel';
import {
    useCreateExerciseMutation,
    useUpdateExerciseByIdMutation,
} from '../../../store/api';
import './ExercisesPage.css';

const ExercisePage = () => {
    // Hooks
    const {
        data: exercises,
        isFetching,
        isLoading,
    } = useFetchAllExercisesQuery();

    const navigate = useNavigate();
    const { isAdmin } = useContext(AuthContext);
    const { showLoader, hideLoader } = useLoader();
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [createExercise] = useCreateExerciseMutation();
    const [updateExerciseById] = useUpdateExerciseByIdMutation();
    const [deleteExerciseById] = useDeleteExerciseByIdMutation();

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

    useEffect(() => {
        if (isFetching || isLoading) {
            showLoader();
        } else {
            hideLoader();
        }
    }, [isFetching, isLoading, showLoader, hideLoader]);

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
        showLoader();

        const resultAction = await createExercise(exercise);

        closeAddModal();
        hideLoader();
    };

    const handleUpdateExercise = async (exercise) => {
        showLoader();

        const resultAction = await updateExerciseById({
            id: selectedExercise.id,
            exercise,
        });

        closeEditModal();
        hideLoader();
    };

    const handleDeleteExercise = async () => {
        showLoader();

        const resultAction = await deleteExerciseById(selectedExercise.id);

        setDeleteModalOpen(false);
        hideLoader();
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
