import React from 'react'

/* Component to display a star rating based on a given decimal value */
export function StarRating(rating) {
    const stars = [...Array(5)]
    // round rating to nearest integer
    const roundedRating = Math.round(rating.rating)

    return (
        <div>
            {stars.map((star, index) =>
            (roundedRating > index
                ? <span key={index} style={{ color: "#FBBC04" }}>&#9733;</span> // Filled star
                : <span key={index} style={{ color: "#B3B6B6" }}>&#9733;</span> // Empty star
            ))}
        </div>
    );
}
