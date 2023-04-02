import React from 'react'

export function StarRating(rating) {
    const stars = [...Array(5)]
    const roundedRating = Math.round(rating.rating)

    return (
        <div>
            {stars.map((star, index) =>
            (roundedRating > index
                ? <span key={index} style={{ color: "#FBBC04" }}>&#9733;</span>
                : <span key={index} style={{ color: "#B3B6B6" }}>&#9733;</span>
            ))}
        </div>
    );
}
