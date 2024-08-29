import { useEffect, useRef, useState } from 'react'

export function ProgressBar({
    currProgress,
    setCurrent,
    maxProgress,
    handleProgressClick,
    type,
    playerRef,
}) {
    const [progress, setProgress] = useState((currProgress / maxProgress) * 100 || 0)
    const [onHover, setOnHover] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const progressContainerRef = useRef(null)
    const isVolume = type === 'volume-progress'

    useEffect(() => {
        setProgress((currProgress / maxProgress) * 100)
    }, [currProgress, maxProgress])

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
        } else {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])

    function onUpdateProgress(e = null, newValue = null) {
        const progressContainer = progressContainerRef.current
        const width = progressContainer.offsetWidth
        let maxValue, calculatedValue

        if (isVolume) {
            maxValue = 100
            calculatedValue =
                newValue !== null
                    ? newValue
                    : Math.max(
                          0,
                          Math.min(
                              ((e.clientX - progressContainer.getBoundingClientRect().left) /
                                  width) *
                                  maxValue,
                              maxValue
                          )
                      )
            playerRef.current.setVolume(calculatedValue)
        } else {
            maxValue = playerRef.current.getDuration()
            calculatedValue =
                newValue !== null
                    ? newValue
                    : Math.max(
                          0,
                          Math.min(
                              ((e.clientX - progressContainer.getBoundingClientRect().left) /
                                  width) *
                                  maxValue,
                              maxValue
                          )
                      )
            playerRef.current.seekTo(calculatedValue, true)
        }

        setCurrent(calculatedValue)
        setProgress((calculatedValue / maxValue) * 100)
    }

    function handleMouseDown(e) {
        setIsDragging(true)
        onUpdateProgress(e)
    }

    function handleMouseMove(e) {
        if (isDragging) {
            onUpdateProgress(e)
        }
    }

    function handleMouseUp() {
        setIsDragging(false)
    }

    function handleWheel(e) {
        e.preventDefault()
        let delta
        if (isVolume) {
            delta = e.deltaY < 0 ? 5 : -5
            const currentVolume = playerRef.current.getVolume()
            const newVolume = Math.max(0, Math.min(currentVolume + delta, 100))
            onUpdateProgress(null, newVolume)
        } else {
            delta = e.deltaY > 0 ? 5 : -5
            const currentTime = playerRef.current.getCurrentTime()
            const newTime = Math.max(
                0,
                Math.min(currentTime - delta, playerRef.current.getDuration())
            )
            onUpdateProgress(null, newTime)
        }
    }

    return (
        <div
            className={`clickable-area ${type}`}
            ref={progressContainerRef}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            onWheel={handleWheel}
        >
            <div className='progress-container' onClick={handleProgressClick}>
                <div className='progress-bar' style={{ width: `${progress}%` }}>
                    {onHover && <div className='progress-thumb' style={{ right: 0 }}></div>}
                </div>
            </div>
        </div>
    )
}
