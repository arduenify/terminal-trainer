import React, { useState } from 'react';
import EmojiSelector from '../../../emojiSelector';
import './BadgeForm.css';

const BadgeForm = ({ isEditMode = false, onSubmit, badge = {} }) => {
    const [name, setName] = useState(badge?.name || '');
    const [description, setDescription] = useState(badge?.description || '');
    const [icon, setIcon] = useState(badge?.icon || '');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !description || !icon) {
            return;
        }

        onSubmit({ name, description, icon }, badge?.id);
    };

    return (
        <form onSubmit={handleSubmit} className='badge-form'>
            <label htmlFor='name'>Name</label>
            <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label htmlFor='description'>Description</label>
            <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            ></textarea>

            <label htmlFor='icon'>Icon</label>
            <EmojiSelector onSelect={setIcon} />

            <button type='submit'>
                {isEditMode ? 'Update Badge' : 'Add Badge'}
            </button>
        </form>
    );
};

export default BadgeForm;
