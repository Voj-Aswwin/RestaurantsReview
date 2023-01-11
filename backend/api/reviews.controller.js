import reviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
            const restaurantID = req.body.restaurantID;
            const review = req.body.review;
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = reviewsDAO.addReview(restaurantID, review, userInfo, date)
            res.json({ status: "success" })
        }
        catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async apiUpdateReview(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.review
            const date = new Date()
            const reviewResponse = reviewsDAO.updateReview(reviewId, req.body.user_id, text, date)
            var { error } = reviewResponse
            if (error) {
                res.status(400).json({ error })
            }

            if (reviewResponse.modifiedCount === 0) {
                throw new Error(
                    "unable to update review - user may not be original poster",
                )
            }
            res.json({ status: "success" })
        }
        catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    static async apiDeleteReview(req, res, next) {
        try {
            const reviewId = req.query.id
            const userId = req.body.user_id
            console.log(reviewId)
            const reviewResponse = await reviewsDAO.deleteReview(
                reviewId,
                userId,
            )
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


}