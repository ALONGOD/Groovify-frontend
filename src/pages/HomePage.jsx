// src/pages/HomePage.jsx
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PlayPauseBtn } from '../cmps/PlayPauseBtn'

export function Homepage() {
    const stations = useSelector(state => state.stationModule.stations) || []
    const history = useSelector(state => state.stationModule.history) || []
    const navigate = useNavigate()

    const handleStationClick = stationId => {
        if (stationId) {
            navigate(`/station/${stationId}`)
        } else {
            console.error('Station ID is undefined')
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
                            <div className='play-btn'>
                                <PlayPauseBtn
                                    song={null}
                                    station={station}
                                    type='station-preview'
                                />
                            </div>
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
                                <div className='history-img'>
                                    <img src={song.imgUrl} alt={song.title} />
                                    <div className='play-btn'>
                                        <PlayPauseBtn song={song} station={null} type='history-song' />
                                    </div>
                                </div>
                                <h3 className='history-song-name'>{song.title}</h3>
                                <p className='history-artist'>{song.artist}</p>
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
