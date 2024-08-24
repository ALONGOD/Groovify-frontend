import { FaMagnifyingGlass } from 'react-icons/fa6';
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchResults, setSearchTerm } from '../store/actions/station.actions.js';

export function SearchBar({ searchType = 'youtube', placeholder = "What do you want to play?" }) {
    const [searchTerm, setSearchTermState] = useState('');
    const dispatch = useDispatch();

    function debounce(func, delay) {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }

    const handleSearch = useCallback(
        debounce(async (query) => {
            if (!query) {
                if (searchType === 'station') {
                    dispatch(setSearchTerm('')); // Reset the search term if the query is empty
                }
                return;
            }

            if (searchType === 'youtube') {
                try {
                    const results = await YouTubeAPIService.searchVideos(query);
                    dispatch(setSearchResults(results));
                } catch (error) {
                    console.error('Error fetching YouTube API:', error);
                }
            } else if (searchType === 'station') {
                console.log('Dispatching search term:', query);
                dispatch(setSearchTerm(query));
            }
        }, 800),
        [dispatch, searchType]
    );

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTermState(value);
        handleSearch(value);
    };

    return (
        <div className="search-bar">
            <FaMagnifyingGlass />
            <input
                type="text"
                name="search"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}
