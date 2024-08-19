import { Link } from 'react-router-dom'

export function StationPreview({ station }) {
    return <article className="preview">
        <header>
            <Link to={`/station/${station._id}`}></Link>
        </header>

    </article>
}