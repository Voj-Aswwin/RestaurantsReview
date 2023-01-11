import express from "express"
import restaurantsController from "./restaurants.controller.js"
import reviewsController from "./reviews.controller.js"
const router = express.Router()

router.route("/").get(await restaurantsController.apiGetRestaurants)
router.route("/id/:id").get(await restaurantsController.apiGetRestaurantByID)
router.route("/cuisines").get(await restaurantsController.apiGetCuisines)

router.route("/review")
    .post(await reviewsController.apiPostReview)
    .put(await reviewsController.apiUpdateReview)
    .delete(await reviewsController.apiDeleteReview)

export default router
