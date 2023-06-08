import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ onSearchSubmitted, searchBarOpen, hideSearchBar }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef(null);
    const searchBarRef = useRef(null);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        if (!searchTerm) {
            return;
        }

        onSearchSubmitted(searchTerm);
        setSearchTerm('');
    };

    useEffect(() => {
        if (!searchBarOpen) {
            return;
        }

        const handleClickOutside = (event) => {
            if (!searchBarRef?.current?.contains(event.target)) {
                setSearchTerm('');
                hideSearchBar();
            }
        };

        const inputTimeout = setTimeout(() => {
            inputRef?.current?.focus();
            document.addEventListener('click', handleClickOutside);
        }, 50);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            clearTimeout(inputTimeout);
        };
    }, [searchBarOpen]);

    return (
        <div className='search-bar' ref={searchBarRef}>
            <form onSubmit={handleSearchSubmit}>
                <FontAwesomeIcon id='search-icon' size='lg' icon={faSearch} />
                <input
                    ref={inputRef}
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='search-input'
                />
            </form>
        </div>
    );
};

export default SearchBar;
