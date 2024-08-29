import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdQueueMusic } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { removeStation } from '../../store/actions/station.actions';

export function ThreeDotsModal({ closeModal }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { stationId } = useParams();

    const handleEdit = () => {
        console.log("Edit details option selected");
    };

    const handleDelete = async () => {
        try {
            // Perform the async delete operation
            await removeStation(stationId);
            // Dispatch an action to update the Redux state
            dispatch({ type: 'REMOVE_STATION', stationId });
            // Navigate back to the home page
            navigate('/');
        } catch (err) {
            console.error('Failed to delete station:', err);
        }
        // Close the ThreeDotsModal
        closeModal();
    };

    const handleAddToQueue = () => {
        console.log("Add to queue option selected");
    };

    const modalStyles = {
        position: 'absolute',
        top: '100%',
        left: '0',
        backgroundColor: '#282828',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 10,
        width: '220px',
        padding: '8px 0',
    };

    const listItemStyles = {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        color: '#e0e0e0',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const listItemHoverStyles = {
        backgroundColor: '#3e3e3e',
    };

    const iconStyles = {
        marginRight: '12px',
        fontSize: '18px',
    };

    return (
        <div style={modalStyles}>
            <div
                style={listItemStyles}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3e3e3e')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                onClick={handleAddToQueue}
            >
                <MdQueueMusic style={iconStyles} />
                Add to queue
            </div>
            <div
                style={listItemStyles}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3e3e3e')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                onClick={handleEdit}
            >
                <AiOutlineEdit style={iconStyles} />
                Edit details
            </div>
            <div
                style={listItemStyles}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#3e3e3e')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                onClick={handleDelete}
            >
                <AiOutlineDelete style={iconStyles} />
                Delete
            </div>
        </div>
    );
}
