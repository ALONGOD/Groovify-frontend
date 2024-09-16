import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { PlayPauseBtn } from '../cmps/PlayPauseBtn'
import { query } from '../store/actions/backend.station'
import { StationList } from '../cmps/StationList'

export function Homepage() {
    const [stations, setStations] = useState([])
    const [gridStations, setGridStations] = useState([])
    const history = useSelector(state => state.stationModule.history) || []
    const navigate = useNavigate()

    useEffect(() => {
        const fetchStations = async () => {
            try {
                const fetchedStations = await query('')
                setStations(fetchedStations)
                setGridStations(fetchedStations.slice(0, 8))
            } catch (error) {
                console.error('Error fetching stations:', error)
            }
        }
        fetchStations()
    }, [])

    const handleStationClick = stationId => {
        if (stationId) {
            navigate(`/station/${stationId}`)
        } else {
            console.error('Station ID is undefined')
        }
    }

    return (
        <div className='homepage-container'>
            <div className='top-section'>
                <div className='filter-buttons'>
                    <button className='filter-btn'>All</button>
                    <button className='filter-btn'>Music</button>
                    <button className='filter-btn'>Podcasts</button>
                </div>
            </div>

            <div className='stations-section'>
                <h2>Playlists</h2>
                <StationList
                    stations={gridStations}
                    type='home-station'
                />
            </div>

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
                    <p>No recently played songs</p>
                )}
            </div>
        </div>
    )
}
