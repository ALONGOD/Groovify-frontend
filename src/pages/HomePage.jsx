import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaPause, FaPlay } from 'react-icons/fa'
import { SET_PLAYER_IS_PLAYING, SET_PLAYER_CURRENT_SONG } from '../store/reducers/station.reducer'

export function Homepage() {
    const stations = useSelector(state => state.stationModule.stations) || []
    const history = useSelector(state => state.stationModule.history) || []
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isPlaying = useSelector(state => state.stationModule.player.isPlaying)
    const currSong = useSelector(state => state.stationModule.player.currSong)

    const handleStationClick = stationId => {
        if (stationId) {
            navigate(`/station/${stationId}`)
        } else {
            console.error('Station ID is undefined')
        }
    }

    const handleSongClick = song => {
        if (currSong?.id === song.id) {
            dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: !isPlaying })
        } else {
            dispatch({ type: SET_PLAYER_CURRENT_SONG, currSong: song })
            dispatch({ type: SET_PLAYER_IS_PLAYING, isPlaying: true })
        }
    }

    return (
        <div className='homepage-container'>
            {/* Stations Section */}
            <div className='stations-section'>
                <h2>Playlists</h2>
                <div className='stations-container'>
                    {stations.slice(0, 8).map(station => (
                        <div
                            key={station._id}
                            className='station-card'
                            onClick={() => handleStationClick(station._id)}
                        >
                            <img src={station.imgUrl} alt={station.name} className='station-img' />
                            <h3 className='station-name'>{station.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recently Played Section */}
            <div className='history-section'>
                <h2>Recently Played</h2>
                {history.length > 0 ? (
                    <div className='history-container'>
                        {history.map(song => (
                            <div key={song.id} className='history-card'>
                                <img src={song.imgUrl} alt={song.title} className='history-img' />
                                <h3 className='history-song-name'>{song.title}</h3>
                                <p className='history-artist'>{song.artist}</p>
                                <div
                                    className='play-btn'
                                    onClick={e => {
                                        e.stopPropagation()
                                        handleSongClick(song)
                                    }}
                                >
                                    {isPlaying && currSong?.id === song.id ? (
                                        <FaPause />
                                    ) : (
                                        <FaPlay />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='no-recently-played'>No recently played songs</p>
                )}
            </div>
        </div>
    )
}
