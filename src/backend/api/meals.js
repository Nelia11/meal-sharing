const express = require("express");
const mealRouter = express.Router();
const { getAll, addMeal, getById, updateById, deleteById } = require("./controllers/mealControllers");

// http://localhost:5000/api/meals	GET,	Returns all meals
mealRouter.get("/", getAll);

// /api/meals	POST, Adds a new meal to the database
mealRouter.post("/", addMeal);

// /api/meals/:id	GET,	Returns the meal by id
mealRouter.get("/:id", getById);

// /api/meals/:id PUT,	Updates the meal by id
mealRouter.put("/:id", updateById);

// /api/meals/:id	DELETE,	Deletes the meal by id
mealRouter.delete("/:id", deleteById);

module.exports = mealRouter;