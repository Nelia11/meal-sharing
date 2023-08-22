const express = require("express");
const reviewsRouter = express.Router();
const {
    getAllReviews, 
    getMealReviews, 
    addReview, 
    getReviewById, 
    updateReviewById, 
    deleteReviewById} = require("./controllers/reviewControllers")

// /api/reviews	GET, Returns all reviews.
reviewsRouter.get("/", getAllReviews);

// /api/meals/:meal_id/reviews	GET, Returns all reviews for a specific meal.
reviewsRouter.get("/:meal_id/meal-reviews", getMealReviews);

// /api/reviews	POST, Adds a new review to the database.
reviewsRouter.post("/", addReview);

// /api/reviews/:id	GET, Returns a review by id.
reviewsRouter.get("/:id", getReviewById);

// /api/reviews/:id	PUT, Updates the review by id.
reviewsRouter.put("/:id", updateReviewById);

// /api/reviews/:id	DELETE, Deletes the review by id.
reviewsRouter.delete("/:id", deleteReviewById)

module.exports = reviewsRouter;