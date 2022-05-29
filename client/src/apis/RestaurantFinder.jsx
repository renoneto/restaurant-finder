import axios from "axios"

export default axios.create({
    baseURL: "https://restaurant-finder-reno.herokuapp.com/api/v1/restaurants"
});
