import { useDispatch, useSelector } from 'react-redux'
import { SongPreview } from '../SongPreview'
import { DetailsSidebarClose } from './DetailsSidebarClose'
import { SongList } from '../SongList'
import {
  SET_QUEUE_SHUFFLED,
  SET_QUEUE_SONGS,
} from '../../store/reducers/station.reducer'

export function QueueDetails() {
  const dispatch = useDispatch()
  const queue = useSelector(state => state.stationModule.queue)
  const isShuffled = queue.isShuffled
  const currQueueSongs = isShuffled ? queue.shuffledQueue : queue.songsQueue
  console.log('queue.songsQueue:', queue.songsQueue)
  console.log('queue.shuffledQueue:', queue.shuffledQueue)
  const player = useSelector(state => state.stationModule.player)
  const { currSong, currStation } = player
  //   console.log('currSong:', currSong)

  const currSongIdx = currQueueSongs.findIndex(
    song => song?.id === currSong?.id
  )
  const queueToDisplay = currQueueSongs.slice(currSongIdx + 1)

  if (!queue) return <h2>No queue available</h2>

  async function moveSong(fromIndex, toIndex) {
    fromIndex = currSongIdx + fromIndex + 1
    toIndex = currSongIdx + toIndex + 1
    if (fromIndex === toIndex) return
    const updatedSongs = [...currQueueSongs]
    const [movedSong] = updatedSongs.splice(fromIndex, 1)
    updatedSongs.splice(toIndex, 0, movedSong)
    if (isShuffled) dispatch({ type: SET_QUEUE_SHUFFLED, songs: updatedSongs })
    else dispatch({ type: SET_QUEUE_SONGS, songs: updatedSongs })
  }

  return (
    <>
      <header className="details-header flex flex-row justify-between align-center">
        <h2>Queue</h2>
        <DetailsSidebarClose />
      </header>
      <main className="flex flex-column justify-start">
        <div className="playing-now">
          <h2>Currently Playing</h2>
          {currSong ? (
            <SongPreview song={currSong} />
          ) : (
            <p>No song currently playing</p>
          )}
        </div>
        <div className="playing-next flex flex-column">
          <h2>{currStation ? `Next From: ${currStation.name}` : 'Up Next:'}</h2>
          <SongList
            songs={queueToDisplay}
            type={'queueDetails'}
            moveSong={moveSong}
          />
        </div>
      </main>
    </>
  )
}
