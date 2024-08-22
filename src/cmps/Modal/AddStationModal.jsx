import { AiOutlinePlus } from 'react-icons/ai'

export function AddStationModal() {
    function onAddNewPlaylist() {
        // Handle the logic for adding a new playlist
        console.log('Adding new playlist...')
    }

    function onAddPlaylistFolder() {
        // Handle the logic for adding a new playlist folder
        console.log('Adding playlist folder...')
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
    )
}
