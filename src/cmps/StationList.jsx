import { useState } from 'react'
import { userService } from '../services/user'
import { StationPreview } from './StationPreview'
import { stationService } from '../services/station/station.service.local'

export function StationList() {
    const [stations, setStations] = useState([])

    useEffect(() => {

    }, [])
    
    async function fetchData() {

    }


    return <section>
        <ul className="list">
            {stations.map(station =>
                <li key={station._id}>
                    <StationPreview station={station} />
                </li>)
            }
        </ul>
    </section>
}