import { ObjectId } from "mongodb"

let reviews

export default class ReviewsDAO {

    static async injectDB(conn) {
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db(process.env.RESTAURANTS_NS).collection("reviews")
        } catch (e) {
            console.error(`Unable to establish connection in reviewsDAO ${e}`)
        }
    }

    static async addReview(restaurantId, review, user, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                restaurant_id: ObjectId(restaurantId),
                review: review,
                date: date
            }
            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`Unable to submit review: ${e}`)
            return e
        }
    }

    static async updateReview(reviewId, user_id, text, date) {
        try {
            const updateResponse = await reviews.updateOne(
                { user_id: user_id, _id: ObjectId(reviewId) },
                { $set: { review: text, date: date } },
            )
            return updateResponse
        } catch (e) {
            console.error(`Unable to update review: ${e}`)
            return { error: e }
        }
    }

    static async deleteReview(reviewId, userId) {
        try {
          const deleteResponse = await reviews.deleteOne({
            _id: ObjectId(reviewId),
            user_id: userId,
          })
          return deleteResponse
        } catch (e) {
          console.error(`Unable to delete review: ${e}`)
          return { error: e }
        }
      }
}