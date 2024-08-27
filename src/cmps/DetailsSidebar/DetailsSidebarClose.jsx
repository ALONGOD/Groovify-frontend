import { useDispatch } from 'react-redux'
import { TOGGLE_DETAILS_SIDEBAR } from '../../store/reducers/system.reducer'

export function DetailsSidebarClose() {
    const dispatch = useDispatch()

    function closeSidebar() {
        dispatch({ type: TOGGLE_DETAILS_SIDEBAR })
    }

    return (
        <button className='close-btn' onClick={closeSidebar}>
            ×
        </button>
    )
}
