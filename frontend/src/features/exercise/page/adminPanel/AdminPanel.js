import React, { useEffect, useState } from 'react';
import ExerciseForm from '../form';
import './AdminPanel.css';

const AdminPanel = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

    const openAddModal = () => setAddModalOpen(true);
    const closeAddModal = () => setAddModalOpen(false);

    const openEditModal = (exercise) => {
        setSelectedExercise(exercise);
        setEditModalOpen(true);
    };
    const closeEditModal = () => setEditModalOpen(false);

    const handleAddExercise = (exercise) => {
        // Call the API to add the exercise
        // ...
        closeAddModal();
    };

    const handleUpdateExercise = (exercise) => {
        // Call the API to update the exercise
        // ...
        closeEditModal();
    };

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

            {/* Delete Exercise confirmation modal */}
        </div>
    );
};

export default AdminPanel;
