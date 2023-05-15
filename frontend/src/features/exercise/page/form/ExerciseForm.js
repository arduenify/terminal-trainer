import React, { useEffect, useState } from 'react';
import { useFetchAllCategoriesQuery } from '../../../../store/api';
import './ExerciseForm.css';

const ExerciseForm = ({
    onSubmit,
    exercise = {},
    isEditMode = false,
    validationError,
}) => {
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
        value = value.replace(/\r?\n/g, '\n');

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
            solution: JSON.stringify(solution),
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
            {validationError?.length > 0 && (
                <p className='error'>
                    Error: This title is already taken. Please try another one.
                </p>
            )}
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
                Solution Steps
            </label>
            <p className='solution-sublabel'>
                Each step of the solution requires a command, an output, and an
                instruction.
            </p>
            <div className='command-output-header' />
            {solution.map((step, index) => (
                <div key={index} className='command-output-section'>
                    <div className='command-output-container'>
                        <label htmlFor={`command-${index}`}>
                            Command {index + 1}
                        </label>
                        <textarea
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
                            rows={1}
                            className='command-input'
                        />
                    </div>
                    <div className='command-output-container'>
                        <label htmlFor={`output-${index}`}>
                            Output {index + 1}
                        </label>
                        <textarea
                            type='text'
                            id={`output-${index}`}
                            value={step.output}
                            onChange={(e) =>
                                handleCommandChange(
                                    index,
                                    'output',
                                    e.target.value,
                                )
                            }
                            // required
                            rows={1}
                            className='command-input'
                        />
                    </div>
                    <div className='command-output-container'>
                        <label htmlFor={`instruction-${index}`}>
                            Instruction {index + 1}
                        </label>
                        <textarea
                            type='text'
                            id={`instruction-${index}`}
                            value={step.instruction}
                            onChange={(e) =>
                                handleCommandChange(
                                    index,
                                    'instruction',
                                    e.target.value,
                                )
                            }
                            required
                            rows={1}
                            className='command-input'
                        />
                    </div>
                    <button
                        type='button'
                        className='remove-command-button'
                        onClick={() => removeCommand(index)}
                    >
                        Remove Command {index + 1}
                    </button>
                    {solution.length > 1 && <hr />}
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
