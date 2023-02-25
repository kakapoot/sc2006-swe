import React from 'react'

export function GroupTag({ name }) {
    return (
        <div className="bg-warning text-danger px-2 rounded text-uppercase"><strong>{name}</strong></div>
    )
}
