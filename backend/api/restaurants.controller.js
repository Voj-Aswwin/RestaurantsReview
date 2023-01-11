import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
    static async apiGetRestaurants(req, res, next) {
        const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.cuisine) {
            filters.cuisine = req.query.cuisine
        } else if (req.query.zipcode) {
            filters.zipcode = req.query.zipcode
        } else if (req.query.name) {
            filters.name = req.query.name
        }
        console.log({ filters })
        const { restaurantsList, totalNumOfRestaurants } = await RestaurantsDAO.getRestaurants(filters, page, restaurantsPerPage)
        let response = {
            restaurants: restaurantsList,
            page: page,
            filters: filters,
            entriesPerPage: restaurantsPerPage,
            totalResults: totalNumOfRestaurants
        }
        res.json(response)
    }

    static async apiGetRestaurantByID(req, res, next) {
        try {
            let id = req.params.id || {}
            let restaurant = await RestaurantsDAO.getRestaurantById(id)
            if (!restaurant) {
                res.status(404).json({ status: "Error. No restaurant with given ID" })
                return
            }
            res.json(restaurant)

        } catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }

    }

    static async apiGetCuisines(req, res, next) {
        try {
            let cuisines = await RestaurantsDAO.getCuisines()
            res.json(cuisines)
        }
        catch (e) {
            console.log(`api, ${e}`)
            res.status(500).json({ error: e })
        }
    }
}