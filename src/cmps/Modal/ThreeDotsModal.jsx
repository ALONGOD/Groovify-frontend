import React from 'react';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdQueueMusic } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { removeStation } from '../../store/actions/backend.station';
// import { removeStation } from '../../store/actions/station.actions';

export function ThreeDotsModal({ closeModal, toggleEditStation }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { stationId } = useParams();

    const handleEdit = () => {
        closeModal();
        toggleEditStation();
        console.log("Edit details option selected");
    };

    async function handleDelete() {
        try {
            await removeStation(stationId);
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

    return (
        <div className="three-dots-modal">
            <div
                className="three-dots-modal__item"
                onClick={handleAddToQueue}
            >
                <MdQueueMusic className="three-dots-modal__icon" />
                Add to queue
            </div>
            <div
                className="three-dots-modal__item"
                onClick={handleEdit}
            >
                <AiOutlineEdit className="three-dots-modal__icon" />
                Edit details
            </div>
            <div
                className="three-dots-modal__item"
                onClick={handleDelete}
            >
                <AiOutlineDelete className="three-dots-modal__icon" />
                Delete
            </div>
        </div>
    );
}
