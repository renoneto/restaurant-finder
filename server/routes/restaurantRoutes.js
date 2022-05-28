const express = require('express')
const router = express.Router()

const {
    getAllRestaurants,
    getSingleRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createRestaurantReview
} = require('../controllers/restaurantController')

router
    .route('/')
    .get(getAllRestaurants)
    .post(createRestaurant)

router
    .route('/:id/addReview')
    .post(createRestaurantReview)

router
    .route('/:id')
    .get(getSingleRestaurant)
    .put(updateRestaurant)
    .delete(deleteRestaurant)

module.exports = router
