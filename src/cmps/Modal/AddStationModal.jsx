import { AiOutlinePlus } from 'react-icons/ai';
import { stationService } from '../../services/station/station.service.local.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewStation } from '../../store/actions/backend.station.js';


export function AddStationModal() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function onAddNewStation() {
        try {
            const newStation = await addNewStation()
            navigate(`/station/${newStation._id}`);
        } catch (err) {
            console.error('Failed to add new playlist:', err);
        }
    }

    return (
        <div className="add-station-modal">
            <div className="row flex flex-row" onClick={onAddNewStation}>
                <AiOutlinePlus />
                <h3>Add new playlist</h3>
            </div>
            <div className="row flex flex-row" onClick={''}>
                <AiOutlinePlus />
                <h3>Add playlist folder</h3>
            </div>
        </div>
    );
}
