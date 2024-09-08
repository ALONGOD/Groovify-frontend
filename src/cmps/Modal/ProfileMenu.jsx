import { ExitSvg } from "../svgs/ExitSvg";

export function ProfileMenu() {
     
    return (
        <>
            <div className="row flex flex-row justify-between disabled">
                <h3>Account</h3>
                <ExitSvg />
            </div>
            <div className="row flex flex-row">
                <h3>Profile</h3>
            </div>
            <div className="row flex flex-row settings">
                <h3>Settings</h3>
            </div>
            <div className="row flex flex-row">
                <h3>Log out</h3>
            </div>
        </>
    )
}