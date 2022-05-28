import React from 'react'

const StarRating = ({rating}) => {
    const stars = []
    let remainder = rating

    for (let i = 1; i <= 5; i++) {
        if (remainder >= 1) {
            stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>)
            remainder = remainder - 1
        } else if (remainder > 0 && remainder < 1) {
            stars.push(<i key={i} className="fa-regular fa-star-half-stroke text-warning"></i>)
            remainder = remainder - 1
        } else {
            stars.push(<i key={i} className="fa-regular fa-star text-warning"></i>)
        }
    }

    return (
        <>
        {stars}
        </>
    )
}

export default StarRating
