import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../store/actions/station.actions';

export function SortByModal() {
    const dispatch = useDispatch();
    const currentSortBy = useSelector(state => state.stationModule.sortBy);

    const handleSortChange = () => {
        dispatch(setSortBy('alphabetical'));
        // Optionally, close the modal after selecting the sort option
    };

    return (
        <div className="sort-by-modal">
            <div className="modal-header">Sort by</div>
            <ul className="sort-options">
                <li
                    className={`sort-option ${currentSortBy === 'alphabetical' ? 'active' : ''}`}
                    onClick={handleSortChange}
                >
                    Alphabetical
                </li>
            </ul>
        </div>
    );
}
