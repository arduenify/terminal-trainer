import React, { useContext, useEffect, useState } from 'react';
import { useFetchAllCategoriesQuery } from '../../../../store/api';
import { useLoader } from '../../../modernLoader/context/LoaderContext';
import './ExerciseForm.css';

const ExerciseForm = ({ onSubmit, exercise = {}, isEditMode = false }) => {
    const [title, setTitle] = useState(exercise.title || '');
    const [description, setDescription] = useState(exercise.description || '');
    const [difficulty, setDifficulty] = useState(exercise.difficulty || 'Easy');
    const [teachingText, setTeachingText] = useState(
        exercise.teachingText || '',
    );
    const [categoryId, setCategoryId] = useState(exercise.categoryId || 1);
    const [allCategories, setAllCategories] = useState([]);
    const [solution, setSolution] = useState(
        exercise.solution
            ? Array.isArray(exercise.solution)
                ? exercise.solution.join(', ')
                : exercise.solution
            : '',
    );
    const { showLoader, hideLoader } = useLoader();

    const {
        data: categories,
        isFetching,
        isLoading,
        isSuccess,
    } = useFetchAllCategoriesQuery();

    const handleSubmit = (event) => {
        event.preventDefault();

        const newExercise = {
            title,
            description,
            difficulty,
            teachingText,
            categoryId,
            solution,
        };

        onSubmit(newExercise);
    };

    const handleCategorySelected = (event) => {
        setCategoryId(event.target.value);
    };

    useEffect(() => {
        if (isFetching || isLoading) {
            showLoader();
        } else {
            hideLoader();
        }
    }, []);

    useEffect(() => {
        if (!isLoading && !isFetching && isSuccess)
            setAllCategories(categories);
    }, [categories, isLoading, isFetching, isSuccess]);

    return (
        <form onSubmit={handleSubmit} className='exercise-form'>
            <label htmlFor='title'>Title</label>
            <input
                type='text'
                id='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor='description'>Description</label>
            <textarea
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />

            <label htmlFor='teachingText'>Teaching Content</label>
            <textarea
                id='teaching-text'
                required
                value={teachingText}
                onChange={(e) => setTeachingText(e.target.value)}
            ></textarea>

            <label htmlFor='category'>Category</label>
            <select
                id='category'
                value={categoryId}
                onChange={handleCategorySelected}
            >
                {allCategories?.length &&
                    allCategories.map((category) => {
                        return (
                            <option key={category.id} value={category.id}>
                                {category.key} ({category.name})
                            </option>
                        );
                    })}
            </select>

            <label htmlFor='difficulty'>Difficulty</label>
            <select
                id='difficulty'
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
            >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
            </select>

            <label htmlFor='solution'>
                Solution (Each command is comma separated)
            </label>
            <textarea
                id='solution'
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                required
            />

            <button type='submit'>
                {isEditMode ? 'Update Exercise' : 'Add Exercise'}
            </button>
        </form>
    );
};

export default ExerciseForm;
