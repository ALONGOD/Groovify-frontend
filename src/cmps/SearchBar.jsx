import { FaMagnifyingGlass } from 'react-icons/fa6';
import { YouTubeAPIService } from '../services/youtubeAPI/fetchYoutubeApi.js';
import { useState, useCallback } from 'react';

export function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');

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
            if (query) {
                try {
                    const results = await YouTubeAPIService.searchVideos(query);
                    console.log(results);
                } catch (error) {
                    console.error('Error fetching YouTube API:', error);
                }
            }
        }, 800),
        []
    );

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };

    return (
        <div className="search-bar">
            <FaMagnifyingGlass />
            <input
                type="text"
                name="search"
                placeholder="What do you want to play?"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}
