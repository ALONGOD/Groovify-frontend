import { useNavigate } from "react-router";
import { userService } from "../../services/user/user.service.remote";
import { ExitSvg } from "../svgs/ExitSvg";
import { useSelector } from "react-redux";
import { socketService } from "../../services/socket.service";

export function ProfileMenu() {
    const navigate = useNavigate()
    const user = useSelector(state => state.userModule.user)
    
    async function onLogout() {
        navigate('/auth/login')
        await userService.logout()
        socketService.logout()
    }
    
    function navigateToProfile() {
        navigate(`/profile/${user._id}`)
    }
    return (
        <>
            <div className="row flex flex-row justify-between disabled">
                <h3>Account</h3>
                <ExitSvg />
            </div>
            <div className="row flex flex-row" onClick={navigateToProfile}>
                <h3>Profile</h3>
            </div>
            <div className="row flex flex-row settings">
                <h3>Settings</h3>
            </div>
            <div onClick={onLogout} className="row flex flex-row">
                <h3>Log out</h3>
            </div>
        </>
    )
}