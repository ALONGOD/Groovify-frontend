export function SubMenu({ selected, setSelected }) {
    const handleSelect = item => {
        setSelected(item)
    }

    const handleDeselect = () => {
        setSelected(null)
    }

    return (
        <div className='sub-menu flex'>
            {selected && (
                <button
                    className='sub-link clear-selection'
                    onClick={handleDeselect}
                    style={{ cursor: 'pointer' }}
                >
                    X
                </button>
            )}
            <button
                className={`sub-link ${selected === 'playlists' ? 'active' : ''}`}
                onClick={() => handleSelect('playlists')}
                style={{ cursor: 'pointer' }}
            >
                Playlists
            </button>
            <button
                className={`sub-link ${selected === 'artists' ? 'active' : ''}`}
                onClick={() => handleSelect('artists')}
                style={{ cursor: 'pointer' }}
            >
                Artists
            </button>
        </div>
    )
}
