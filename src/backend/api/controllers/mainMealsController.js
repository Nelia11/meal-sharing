const knex = require("../../database");

const getFutureMeals = async (req, res) => {
    try {
      const mealsQuery = await knex.raw('SELECT "title", "when_date" FROM "meal" WHERE "when_date" > now()');
      const meals = mealsQuery.rows;
      res.status(200).json(meals);
    } catch (error) {
      res.status(500).json(error);
    }
};

const getPastMeals = async(req, res) => {
    try {
      const mealsQuery = await knex.raw('SELECT "title", "when_date" FROM "meal" WHERE "when_date" < now()');
      const meals = mealsQuery.rows;
      res.status(200).json(meals);
    } catch (error) {
      res.status(500).json(error);
    }
};

const sortMealsById = async(req, res) => {
    try {
      const mealsQuery = await knex.raw('SELECT "id", "title" FROM "meal" ORDER BY "id" ASC');
      const meals = mealsQuery.rows;
      res.status(200).json(meals);
    } catch (error) {
      res.status(500).json(error);
    }
};

const getFirstMeal = async(req, res) => {
    try {
      const mealQuery = await knex.raw('SELECT "id", "title" FROM "meal" ORDER BY "id" ASC LIMIT 1');
      const mealArray = mealQuery.rows;
      mealArray.length === 0 
      ? res.status(404).json({"error":"404. Meal not found."})
      : res.status(200).json(mealArray[0]);
    } catch (error) {
      res.status(500).json(error);
    }
};

const getLastMeal = async(req, res) => {
    try {
      const mealQuery = await knex.raw('SELECT "id", "title" FROM "meal" ORDER BY "id" DESC LIMIT 1');
      const mealArray = mealQuery.rows;
      mealArray.length === 0
      ? res.status(404).json({"error":"404. Meal not found."})
      : res.status(200).json(mealArray[0]);
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