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
                <div className='modal'>
                    <div className='modal-content'>
                        <h2>Delete Exercise</h2>
                        <p>Are you sure you want to delete this exercise?</p>
                        <button onClick={handleDeleteExercise}>Delete</button>
                        <button onClick={() => closeDeleteModal()}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
