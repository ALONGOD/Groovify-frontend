import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function Homepage() {
    const stations = useSelector(state => state.stationModule.stations) || []
    const navigate = useNavigate()

    const handleCardClick = stationId => {
        navigate(`/station/${stationId}`)
    }

    return (
        <div className='stations-container'>
            {stations.slice(0, 8).map(station => (
                <div
                    key={station._id || station.id || index}
                    className='station-card flex flex-row'
                    onClick={() => handleCardClick(station._id || station.id || '')}
                    style={{ cursor: 'pointer' }}
                >
                    <img src={station.imgUrl} alt={station.name} className='station-img' />
                    <h3 className='station-name'>{station.name}</h3>
                </div>
            ))}
        </div>
    )
}
