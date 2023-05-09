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
                    <div
                        className='modal'
                        onClick={(e) => {
                            if (e.target.className === 'modal') {
                                closeAddModal();
                            }
                        }}
                    >
                        <div className='modal-content'>
                            <h2>Add Exercise</h2>
                            <ExerciseForm onSubmit={handleAddExercise} />
                        </div>
                    </div>
                )}
            </div>

            {isEditModalOpen && (
                <div
                    className='modal'
                    onClick={(e) => {
                        if (e.target.className === 'modal') {
                            closeEditModal();
                        }
                    }}
                >
                    <div className='modal-content'>
                        <h2>Edit Exercise</h2>
                        <ExerciseForm
                            onSubmit={handleUpdateExercise}
                            exercise={selectedExercise}
                            isEditMode={true}
                        />
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div
                    className='modal delete'
                    onClick={(e) => {
                        if (e.target.className === 'modal delete') {
                            closeDeleteModal();
                        }
                    }}
                >
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
