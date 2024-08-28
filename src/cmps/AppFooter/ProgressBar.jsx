import { useEffect, useRef, useState } from "react"

export function ProgressBar({ currProgress, setCurrent, maxProgress, handleProgressClick, type, playerRef,  }) {

    const [progress, setProgress] = useState((currProgress / maxProgress) * 100 || 0)
    const [onHover, setOnHover] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const progressContainerRef = useRef(null);
    const isVolume = type === 'volume-progress'

    useEffect(() => {
      setProgress((currProgress / maxProgress) * 100)
    }, [currProgress, maxProgress])
    
    

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);


    function onUpdateProgress(e) {
        const progressContainer = progressContainerRef.current;
        const width = progressContainer.offsetWidth;
        const clickX = e.clientX - progressContainer.getBoundingClientRect().left;
        if (isVolume) {
            var maxValue = 100;
            var newValue = Math.max(0, Math.min((clickX / width) * maxValue, maxValue));
            playerRef.current.setVolume(newValue);
        } else {
            var maxValue = playerRef.current.getDuration();
            var newValue = Math.max(0, Math.min((clickX / width) * maxValue, maxValue));
            playerRef.current.seekTo(newValue, true);
        }

        setCurrent(newValue)
        setProgress((newValue / maxValue) * 100);
    };

    function handleMouseDown(e) {
        setIsDragging(true);
        onUpdateProgress(e);
    };

    function handleMouseMove(e) {
        if (isDragging) {
            onUpdateProgress(e);
        }
    };

    function handleMouseUp() {
        setIsDragging(false);
    }

    return <div className={`clickable-area ${type}`} ref={progressContainerRef} onMouseDown={handleMouseDown}  onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
        <div className='progress-container' onClick={handleProgressClick}>
            <div className='progress-bar' style={{ width: `${progress}%` }} >
                {onHover && <div className='progress-thumb' style={{ right: 0 }}></div>}
            </div>
        </div>
    </div>

}