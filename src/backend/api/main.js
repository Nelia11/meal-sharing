const express = require("express");
const mainMealsRouter = express.Router();
const { getFutureMeals, getPastMeals, sortMealsById, getFirstMeal, getLastMeal } = require("./controllers/mainMealsController");

// /future-meals: Respond with all meals in the future (relative to the when datetime)
mainMealsRouter.get("/future-meals", getFutureMeals);
  
// /past-meals:	Respond with all meals in the past (relative to the when datetime)
mainMealsRouter.get("/past-meals", getPastMeals);

// /all-meals: Respond with all meals sorted by ID
mainMealsRouter.get("/all-meals", sortMealsById);

// /first-meal:	Respond with the first meal (meaning with the minimum id)
mainMealsRouter.get("/first-meal", getFirstMeal);

// /last-meal: Respond with the last meal (meaning with the maximum id)
mainMealsRouter.get("/last-meal", getLastMeal);

module.exports = mainMealsRouter;