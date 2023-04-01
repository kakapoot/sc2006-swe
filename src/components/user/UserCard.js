import React from 'react'
import { Link } from 'react-router-dom'



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

export function RedirectableUserCard({ username, name, organization, groupOwner }) {
    return (
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

