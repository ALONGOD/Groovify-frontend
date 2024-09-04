import { useSelector } from "react-redux"
import { SongPreview } from "../SongPreview"
import { DetailsSidebarClose } from "./DetailsSidebarClose"
import { SongList } from "../SongList"

export function QueueDetails() {
    const queue = useSelector(state => state.stationModule.queue)
    const queueMode = queue.isShuffled
    const currQueueSongs = queueMode ? queue.shuffledQueue : queue.songsQueue
    const player = useSelector(state => state.stationModule.player)
    const {currSong, currStation} = player
    console.log('currSong:', currSong)

    const currSongIdx = currQueueSongs.findIndex(song => song.id === currSong.id)
    const queueToDisplay = currQueueSongs.slice(currSongIdx + 1);

    if (!queue) return <h2>No queue available</h2>
    return (
        <>
            <header className="details-header flex flex-row justify-between align-center">
                <h2>Queue</h2>
                <DetailsSidebarClose />
            </header>
            <main className="flex flex-column justify-start">
                <div className="playing-now">
                    <h2>Currently Playing</h2>
                    {currSong ? <SongPreview song={currSong} /> : <p>No song currently playing</p>}
                </div>
                <div className="playing-next flex flex-column">
                    <h2>{currStation ? `Next From: ${currStation.name}` : 'Up Next:'}</h2>
                    <SongList songs={queueToDisplay} type={'queueDetails'} />
                </div>
            </main>
        </>
    )
}