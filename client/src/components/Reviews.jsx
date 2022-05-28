import React from 'react'
import StarRating from './StarRating'

const Reviews = ({reviews}) => {
  return (
    <div className="row row-cols-3 mb-2 justify-content-evenly">
      {reviews.map((element) => {
        return (
          <div key={element.id} className="card text-white bg-primary mb-3 mr-4" style={{maxWidth: "30%"}}>
              <div className="card-header d-flex justify-content-between">
                  <span>{element.user_name}</span>
                  <span><StarRating rating={element.rating} /></span>
              </div>
              <div className="card-body">
                  <p className="card-text">{element.review}</p>
              </div>
          </div>
        )
      })}
    </div>
  )
}

export default Reviews
