import React from 'react'
import { Link } from 'react-router-dom'

/* Component for displaying a selectable user card */
export function SelectableUserCard({ newOwner, onSelectUserCard, username, name, organization }) {
    const handleClick = () => {
        onSelectUserCard(username)
    }

    return (
        <div key={username} onClick={handleClick}
            className={username === newOwner ? "text-start btn btn-danger text-light" : "text-start btn btn-warning"} >
            <div className="d-flex gap-2">
                <div className="d-flex flex-column w-100">
                    <span><strong>{name}</strong> @{username}</span>
                    <span>{organization}</span>
                </div>
            </div>
        </div >
    )
}

/* Component for displaying a redirectable user card */
export function RedirectableUserCard({ username, name, organization, groupOwner }) {
    return (
        // Redirect to selected user's profile
        <Link to={`/user/${username}`} className="text-start btn btn-warning">
            <div className="d-flex gap-2">
                <div className="d-flex flex-column w-100">
                    {/* Indicate group owner */}
                    {username === groupOwner ? <span className="text-danger"><strong>★ Owner</strong></span> : null}

                    <span><strong>{name}</strong> @{username}</span>
                    <span>{organization}</span>
                </div>
            </div>
        </Link>
    )
}

