import React, { useEffect, useState } from 'react';
import { useFetchAllCategoriesQuery } from '../../../../store/api';
import './ExerciseForm.css';

const ExerciseForm = ({ onSubmit, exercise = {}, isEditMode = false }) => {
    const [title, setTitle] = useState(exercise.title || '');
    const [description, setDescription] = useState(exercise.description || '');
    const [difficulty, setDifficulty] = useState(
        exercise.difficulty || 'beginner',
    );
    const [teachingText, setTeachingText] = useState(
        exercise.teachingText || '',
    );
    const [categoryId, setCategoryId] = useState(exercise.categoryId || 1);
    const [allCategories, setAllCategories] = useState([]);
    const [solution, setSolution] = useState(() => {
        let newSolution = exercise.solution || [];

        if (typeof exercise.solution === 'string') {
            newSolution = JSON.parse(exercise.solution);
        }

        return newSolution;
    });

    const {
        data: categories,
        isFetching,
        isLoading,
        isSuccess,
    } = useFetchAllCategoriesQuery();

    const addCommand = () => {
        setSolution((prev) => [...prev, { command: '', output: '' }]);
    };

    const removeCommand = (index) => {
        setSolution((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
        ]);
    };

    const handleCommandChange = (index, field, value) => {
        setSolution((prev) => {
            const updatedStep = { ...prev[index], [field]: value };
            return [
                ...prev.slice(0, index),
                updatedStep,
                ...prev.slice(index + 1),
            ];
        });
    };

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
                <option>beginner</option>
                <option>intermediate</option>
                <option>advanced</option>
            </select>

            <label htmlFor='solution' className='solution-label'>
                Solution (Each command is comma separated)
            </label>
            <div className='command-output-header'>
                <span>Commands</span>
                <span>Output</span>
            </div>
            {solution.map((step, index) => (
                <div key={index} className='command-output-pair'>
                    <input
                        type='text'
                        id={`command-${index}`}
                        value={step.command}
                        onChange={(e) =>
                            handleCommandChange(
                                index,
                                'command',
                                e.target.value,
                            )
                        }
                        required
                    />

                    <input
                        type='text'
                        id={`output-${index}`}
                        value={step.output}
                        onChange={(e) =>
                            handleCommandChange(index, 'output', e.target.value)
                        }
                        required
                    />

                    <button
                        type='button'
                        className='remove-command-button'
                        onClick={() => removeCommand(index)}
                    >
                        x
                    </button>
                </div>
            ))}
            <button
                type='button'
                className='add-command-button'
                onClick={addCommand}
            >
                Add Command
            </button>
            <button type='submit'>
                {isEditMode ? 'Update Exercise' : 'Add Exercise'}
            </button>
        </form>
    );
};

export default ExerciseForm;
