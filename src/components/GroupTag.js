import React, { useState } from 'react'

export function GroupDisplayTag({ name }) {
    return (
        <button className="disabled btn btn-warning py-0 text-uppercase"><strong>{name}</strong></button>
    )
}

export function GroupSelectableTag({ name, isSelected, onSelectTag }) {
    const handleClick = () => {
        onSelectTag(name)
    }

    return (
        <button onClick={handleClick} className={isSelected ? "btn btn-danger py-0 text-light text-uppercase" : "btn btn-warning py-0 text-uppercase"}><strong>{name}</strong></button>
    )
}
