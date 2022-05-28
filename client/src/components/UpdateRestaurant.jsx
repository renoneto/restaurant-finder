import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from "react-router-dom"
import RestaurantFinder from '../apis/RestaurantFinder'

function UpdateRestaurant(props) {
    const { id } = useParams()
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [priceRange, setPriceRange] = useState(1)
    let history = useHistory()

    useEffect( () => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`)
                const restaurantData = response.data.data.restaurant
                console.log(response)
                setName(restaurantData['name'])
                setLocation(restaurantData['location'])
                setPriceRange(restaurantData['price_range'])
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await RestaurantFinder.put(`/${id}`, {
                name,
                location,
                price_range: priceRange
            })
            history.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} id="name" type="text" className='form-control'/>
                    </div>
                    <label htmlFor="name">Location</label>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} id="location" type="text" className='form-control'/>
                    </div>
                    <div className="col">
                        <label htmlFor="name">Price Range</label>
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className='custom-select my1 mr-sm-2'>
                            <option value="1">$</option>
                            <option value="2">$$</option>
                            <option value="3">$$$</option>
                            <option value="4">$$$$</option>
                            <option value="5">$$$$$</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className='btn btn-primary'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateRestaurant
