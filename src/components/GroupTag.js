import React from 'react'

export function GroupDisplayTag({ name }) {
    return (
        <div className="bg-warning text-danger px-2 rounded text-uppercase"><strong>{name}</strong></div>
    )
}

export function GroupSelectableTag({ name }) {
    // TODO : create toggleable tag for filtering
    return (

        <div className="bg-warning text-danger px-2 rounded text-uppercase"><strong>{name}</strong></div>
    )
}
