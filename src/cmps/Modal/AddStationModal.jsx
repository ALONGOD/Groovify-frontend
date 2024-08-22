import { AiOutlinePlus } from 'react-icons/ai';
import { stationService } from '../../services/station/station.service.local.js';
import { useDispatch } from 'react-redux';
import { ADD_STATION } from '../../store/reducers/station.reducer.js';

export function AddStationModal() {
    const dispatch = useDispatch();

    async function onAddNewPlaylist() {
        try {
            const newStation = await stationService.addNewStation((station) => {
                dispatch({ type: ADD_STATION, station });
            });
            console.log('New playlist added:', newStation);
        } catch (err) {
            console.error('Failed to add new playlist:', err);
        }
    }

    function onAddPlaylistFolder() {
        // Handle the logic for adding a new playlist folder
        console.log('Adding playlist folder...');
    }

    return (
        <div className="add-station-modal">
            <div className="row flex flex-row" onClick={onAddNewPlaylist}>
                <AiOutlinePlus />
                <h3>Add new playlist</h3>
            </div>
            <div className="row flex flex-row" onClick={onAddPlaylistFolder}>
                <AiOutlinePlus />
                <h3>Add playlist folder</h3>
            </div>
        </div>
    );
}
