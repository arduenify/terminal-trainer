import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css';

const SearchBar = ({ onSearchSubmitted }) => {
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div className='search-bar'>
            <form onSubmit={handleSearchSubmit}>
                <FontAwesomeIcon id='search-icon' size='lg' icon={faSearch} />
                <input
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
