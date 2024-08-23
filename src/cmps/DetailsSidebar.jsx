export function DetailsSidebar() {
    return (
        <aside className='details-sidebar'>
            <header className='details-header'>
                <h3>AC/DC</h3>
                <div className='header-actions'>
                    <button className='more-options'>•••</button>
                    <button className='close-btn'>×</button>
                </div>
            </header>
            <div className='details-image'>
                <img
                    src='https://images.squarespace-cdn.com/content/v1/5f4a6763a23dbb3ab86255f7/1714746991313-X8OIYB1KK2ZR01U15XK4/30.png'
                    alt='Album Art'
                />
            </div>
            <div className='details-song-info'>
                <div className='song-and-band'>
                    <h2>You Shook Me All Night Long</h2>
                    <h4>AC/DC</h4>
                </div>
                <button className='add-btn'>+</button>
            </div>

            <div className='artist-info'>
                <h4>About the artist</h4>
                <div className='artist-details'>
                    <img src='path-to-artist-image.jpg' alt='AC/DC' />
                    <div>
                        <p>AC/DC</p>
                        <p>39,792,675 monthly listeners</p>
                        <p>
                            With a limitless supply of dirty riffs, snarling vocals, and timelessly
                            catchy, anthemic choruses, AC/DC is one of the most important and
                            long-lasting forces in hard rock.
                        </p>
                        <button className='unfollow-btn'>Unfollow</button>
                    </div>
                </div>
            </div>
        </aside>
    )
}
