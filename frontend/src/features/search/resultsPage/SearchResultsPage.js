import { useLocation } from 'react-router-dom';
import './SearchResultsPage.css';

const SearchResultsPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    return (
        <div className='search-results-page'>
            <h1 className='search-results-title'>Search results</h1>
            <h2 className='search-term-title'>
                You searched for: <strong>{query}</strong>
            </h2>
        </div>
    );
};

export default SearchResultsPage;
