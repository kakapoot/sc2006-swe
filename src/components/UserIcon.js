import React from 'react'
import { Link } from 'react-router-dom'

export function UserIcon({ imgSrc, userId }) {
    return (
        <Link to={`/profile/${userId}`}>
            <img src={imgSrc} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
        </Link>
    )
}

export function LargeUserIcon({ imgSrc }) {
    return (
        <img src={imgSrc} className="rounded-circle" style={{ width: "200px", height: "200px" }} />
    )
}
