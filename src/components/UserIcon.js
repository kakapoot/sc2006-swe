import React from 'react'

export function UserIcon({ imgSrc }) {
    return (
        <img src={imgSrc} className="rounded-circle" style={{ width: "50px", height: "50px" }} />
    )
}
