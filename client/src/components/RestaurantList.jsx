import React, {useContext, useEffect} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'
import { useHistory } from "react-router-dom"
import StarRating from './StarRating'

const RestaurantList = (props) => {
    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
    let history = useHistory()
    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/")
                setRestaurants(response.data.data.restaurants)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [setRestaurants])

    const handleDelete = async (e, id) => {
        e.stopPropagation()
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }))
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (e, id) => {
        e.stopPropagation()
        try {
            history.push(`/restaurants/${id}/update`)
        } catch (error) {

        }
    }

    const handleDetail = async (id) => {
        try {
            history.push(`/restaurants/${id}`)
        } catch (error) {

        }
    }

    const renderRating = (restaurant) => {
        if (!restaurant.number_of_reviews) {
            return <span className="text-warning ml-1">0 reviews</span>
        }

        return (
            <>
                <StarRating rating={restaurant.average_rating}/>
                <span className="text-warning ml-1">({restaurant.number_of_reviews})</span>
            </>
        )
    }

    return (
    <div className='list-group'>
        <table className="table table-hover">
            <thead>
                <tr className='bg-primary'>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Location</th>
                    <th scope="col">Price Range</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                   {restaurants && restaurants.map(element => {
                        return (
                            <tr onClick={() => { handleDetail(element.id)}} key={element.id}>
                                <td>{element.name}</td>
                                <td>{element.location}</td>
                                <td>{"$".repeat(element.price_range)}</td>
                                <td>
                                    {renderRating(element)}
                                </td>
                                <td><button onClick={(e) => handleUpdate(e, element.id)} className='btn btn-warning'>Update</button></td>
                                <td><button onClick={(e) => handleDelete(e, element.id)} className='btn btn-danger'>Delete</button></td>
                            </tr>
                        )
                    })
                    }
            </tbody>
        </table>
    </div>
    )
}

export default RestaurantList

