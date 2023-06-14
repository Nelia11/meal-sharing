const knex = require("../../database");

const getFutureMeals = async (req, res) => {
    try {
      const meals = await knex.raw("SELECT `title`, `when` FROM `meal` WHERE `when` > now()");
      res.status(200).json(meals[0]);
    } catch (error) {
      res.status(500).json(error);
    }
};

const getPastMeals = async(req, res) => {
    try {
      const meals = await knex.raw("SELECT `title`, `when` FROM `meal` WHERE `when` < now()");
      res.status(200).json(meals[0]);
    } catch (error) {
      res.status(500).json(error);
    }
};

const sortMealsById = async(req, res) => {
    try {
      const meals = await knex.raw("SELECT `id`, `title` FROM `meal` ORDER BY `id` ASC");
      res.status(200).json(meals[0]);
    } catch (error) {
      res.status(500).json(error);
    }
};

const getFirstMeal = async(req, res) => {
    try {
      const meal = await knex.raw("SELECT `id`, `title` FROM `meal` ORDER BY `id` ASC LIMIT 1");
      
      meal[0].length === 0 
      ? res.status(404).json({"error":"404. Meal not found."})
      : res.status(200).json(meal[0][0]);
    } catch (error) {
      res.status(500).json(error);
    }
};

const getLastMeal = async(req, res) => {
    try {
      const meal = await knex.raw("SELECT `id`, `title` FROM `meal` ORDER BY `id` DESC LIMIT 1");
      
      meal[0].length === 0
      ? res.status(404).json({"error":"404. Meal not found."})
      : res.status(200).json(meal[0][0]);
    } catch (error) {
      res.status(500).json(error);
    }
};

module.exports = {
    getFutureMeals,
    getPastMeals,
    sortMealsById,
    getFirstMeal,
    getLastMeal
};