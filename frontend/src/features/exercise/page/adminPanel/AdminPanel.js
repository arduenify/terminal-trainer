import React from 'react';
import ExerciseForm from '../form';
import './AdminPanel.css';

const AdminPanel = ({
    openAddModal,
    closeAddModal,
    closeEditModal,
    selectedExercise,
    handleAddExercise,
    handleUpdateExercise,
    handleDeleteExercise,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    closeDeleteModal,
}) => {
    return (
        <div className='admin-panel'>
            <div className='add-exercise-container'>
                <p>As an Administrator, you can add a new exercise below.</p>

                <button onClick={openAddModal}>Add Exercise</button>
                {isAddModalOpen && (
                    <div className='modal'>
                        <div className='modal-content'>
                            <h2>Add Exercise</h2>
                            <ExerciseForm onSubmit={handleAddExercise} />
                            <button onClick={closeAddModal}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>

            {isEditModalOpen && (
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>Edit Exercise</h2>
                        <ExerciseForm
                            onSubmit={handleUpdateExercise}
                            exercise={selectedExercise}
                            isEditMode={true}
                        />
                        <button onClick={closeEditModal}>Cancel</button>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className='modal delete'>
                    <div className='modal-content'>
                        <h2>Delete Exercise</h2>
                        <p>Are you sure you want to delete this exercise?</p>
                        <div className='modal-content-delete-buttons'>
                            <button
                                className='button delete'
                                onClick={handleDeleteExercise}
                            >
                                Delete
                            </button>
                            <button onClick={() => closeDeleteModal()}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
