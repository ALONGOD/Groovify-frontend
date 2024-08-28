import { useState } from "react"

export function ProgressBar({ currProgress, maxProgress, handleProgressClick, type }) {
    const progress = (currProgress / maxProgress) * 100 || 0
    const [onHover, setOnHover ] = useState(false)

    return <div className={`clickable-area ${type}`} onClick={handleProgressClick} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
        <div className='progress-container' onClick={handleProgressClick}>
            <div className='progress-bar' style={{ width: `${progress}%` }} >
                {onHover && <div className='progress-thumb'  style={{ right: 0 }}></div>}
            </div>
        </div>
    </div>

}