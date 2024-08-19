import { userService } from '../services/user'
import { StationPreview } from './StationPreview'

export function StationList({ stations}) {

    // function shouldShowActionBtns(station) {
    //     const user = userService.getLoggedinUser()

    //     if (!user) return false
    //     if (user.isAdmin) return true
    //     return station.owner?._id === user._id
    // }

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