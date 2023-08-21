const knex = require("../../database");

const getAllReviews = async (req, res) => {
    try {
        const reviews = await knex
        .from("review")
        .select(
            "id", 
            "title",
            "description",
            "meal_id",
            "stars",
            "created_date"
        );

        reviews.length === 0
        ? res.status(404).json(reviews)
        : res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getMealReviews = async (req, res) => {
    try {
        const id = req.params.meal_id;
        const mealExists = await knex("meal").where({id}).select(1).first();
        if (!mealExists) {
            return res.status(404).json({"error": "Meal not found"});
        }

        const reviewExists = await knex("review").where({id}).select(1).first();
        if (!reviewExists) {
            return res.status(200).json({"msg": "No reviews"});
        }
        const rows = await knex
        .from("review")
        .select(
            "review.id",
            "review.title" , 
            "review.description", 
            "stars", 
            "meal.title AS meal", 
            "location",
            "review.created_date"
            )
        .leftJoin("meal", {"meal.id": "meal_id"})
        .where({"meal_id" : id});

        const reviews = {
            meal: rows[0].meal,
            location: rows[0].location,
            reviews: rows.map((row) => ({
                id: row.id,
                title: row.title,
                description: row.description,
                stars: row.stars,
                posted: row.created_date
            }))
        };

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json(error);
    }
};

const addReview = async (req, res) => {
    try {
        const review = req.body;
        const requiredFields = [
            "title",
            "description",
            "meal_id",
            "stars",
            "created_date"
        ];

        const missingMandatoryField = requiredFields.some((field) => !review[field]);

        if (missingMandatoryField) {
            return res.status(400).json({"error": "Incomplete review data"});
        } else if (isNaN(review.meal_id) || isNaN(review.stars)) {
            return res.status(400).json({"error": "Invalid data type"});
         } else {
            await knex("review").insert(review);
            res.status(200).json({"message": "Added review"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getReviewById = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await knex("review")
        .select(
            "title",
            "description",
            "stars",
            "created_date"
        )
        .where({id});

        review.length === 0 
        ? res.status(404).json({"error": "Review not found"})
        : res.status(200).json(review);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateReviewById = async (req, res) => {
    try {
        const id = req.params.id;
        const reviewUpdate = req.body;
        const reviewExists = await knex("review").where({id}).select(1).first();

        if (!reviewExists) {
            res.status(404).json({"error": "Review not found"});
        } else if (reviewExists) {
            if (Object.keys(reviewUpdate).length === 0) {
                return res.status(400).json({"error": "Please, enter a new review information"});
            } else {
                await knex("review").where({id}).update(reviewUpdate);
                res.status(200).json({"message": "Review updated"});
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteReviewById = async (req, res) => {
    try {
        const id = req.params.id;
        const reviewExists = await knex("review").where({id}).select(1).first();

        await knex("review").where({id}).del();

        !reviewExists
        ? res.status(404).json({"error": "Review not found"})
        : res.status(200).json({"message": "Review deleted"});
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getAllReviews,
    getMealReviews,
    addReview,
    getReviewById,
    updateReviewById,
    deleteReviewById
};