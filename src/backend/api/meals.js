const express = require("express");
const router = express.Router();
const knex = require("../database");

// http://localhost:5000/api/meals	GET,	Returns all meals
router.get("/", async (req, res) => {
  try {
    const meals = await knex("meal").select("id", "title");

    meals.length === 0
    ? res.status(404).send("Meals not found")
    : res.status(200).send(meals);
  } catch (error) {
    res.status(500).json(error);
  }
});

// /api/meals	POST, Adds a new meal to the database
router.post("/", async (req, res) => {
  try {
    const meal = req.body;

    const addMeal = await knex("meal").insert(meal);
    res.status(201).send({"message": "Added meal"});
  } catch (error) {
    res.status(500).json(error);
  }
});

// /api/meals/:id	GET,	Returns the meal by id
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const meal = await knex("meal").select("id", "title").where({id});

    meal.length === 0
    ? res.status(404).send("Meal not found")
    : res.status(200).send(meal);
  } catch (error) {
    res.status(500).json(error);
  }
});

// /api/meals/:id PUT,	Updates the meal by id
router.put("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const meal = req.body;

    const meals = await knex("meal").select("id");
    const updateMeal = await knex("meal").where({id}).update(meal);
    
    id > meals.length
    ? res.status(404).send("Meal not found")
    : res.status(200).send({"message": "Updated meal"});
  } catch (error) {
    res.status(500).json(error);
  }
});

// /api/meals/:id	DELETE,	Deletes the meal by id
router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const meals = await knex("meal").select("id");
    const deleteMeal = await knex("meal").where({id}).del();

    id > meals.length
    ? res.status(404).send("Meal not found")
    : res.status(200).send({"message": "Deleted meal"});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
