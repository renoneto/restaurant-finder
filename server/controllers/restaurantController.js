const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const db = require('../db')

const getAllRestaurants = async (req, res) => {
    try {
        const results = await db.query(`
            select
                r.*
                , reviews.number_of_reviews
                , reviews.average_rating

            from restaurants r

            left join (select restaurant_id, trunc(AVG(rating),2) as average_rating, count(id) as number_of_reviews from reviews group by 1) as reviews
                on r.id = reviews.restaurant_id
        `)
        res.status(StatusCodes.OK).json({
            status: "success",
            results: results.rows.length,
            data: {
                restaurants: results.rows
            }
        })
    } catch (error) {
        console.log(error)
    }
}

const getSingleRestaurant = async (req, res) => {
    const {id: restaurantId} = req.params
    const results = await db.query("select * from restaurants where id = $1", [restaurantId])
    const reviews = await db.query("select * from reviews where restaurant_id = $1", [restaurantId])
    const metrics = await db.query(`
        select
            trunc(AVG(rating),2) as average_rating
            , count(id) as number_of_reviews

        from reviews

        where restaurant_id = $1`, [restaurantId])

    if (results.rows.length === 0) {
        throw new CustomError.NotFoundError(`No restaurant with id ${restaurantId}`)
    }

    res.status(StatusCodes.OK).json({
        status: "success",
        data: {
            restaurant: results.rows[0],
            metrics: metrics.rows[0],
            reviews: reviews.rows,
        }
    })
}

const createRestaurant = async (req, res) => {
    try {
        const {name, location, price_range} = req.body;
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) returning *", [name, location, price_range])

        res.status(StatusCodes.CREATED).json({
            status: "success",
            data: results.rows[0]
        })

    } catch (error) {
        console.log(error)
    }
}

const createRestaurantReview = async (req, res) => {
    try {
        const {id: restaurantId} = req.params
        const {name, rating, reviewText} = req.body;
        const results = await db.query("INSERT INTO reviews (restaurant_id, user_name, rating, review) VALUES ($1, $2, $3, $4) returning *", [restaurantId, name, rating, reviewText])

        res.status(StatusCodes.CREATED).json({
            status: "success",
            data: results.rows[0]
        })

    } catch (error) {
        console.log(error)
    }
}

const updateRestaurant = async (req, res) => {
    const {name, location, price_range} = req.body;
    const {id: restaurantId} = req.params;
    const results = await db.query("update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *", [name, location, price_range, restaurantId])

    res.status(StatusCodes.OK).json({
        status: "success",
        data: results.rows[0]
    })
}

const deleteRestaurant = async (req, res) => {
    const {id: restaurantId} = req.params
    const results = await db.query("delete from restaurants where id = $1", [restaurantId])
    console.log(results)

    res.status(StatusCodes.NO_CONTENT).json({
        status: "success",
    })
}

module.exports = {
    getAllRestaurants,
    getSingleRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
    createRestaurantReview
}
