const knex = require("../../database");

const getAll = async (req, res) => {
    try {
      const meals = await knex("meal").select("id", "title");
  
      meals.length === 0
      ? res.status(404).json({"error": "Meal not found"})
      : res.status(200).json(meals);
    } catch (error) {
      res.status(500).json(error);
    }
};

const addMeal = async (req, res) => {
    try {
      const meal = req.body;
  
      const requiredFields = [
        "title", 
        "description", 
        "location", 
        "when", 
        "max_reservations", 
        "price", 
        "created_date"
      ];

      const missingMandatoryField = requiredFields.some((field)=> !req.body[field]);
  
      if (missingMandatoryField) {
        res.status(400).json({"error": "Incomplite meal data"});
        return;
      } else if (isNaN(meal.price) || meal.price <= 0) {
        res.status(400).json({"error": "Invalid price"});
        return;
      } else {
        await knex("meal").insert(meal);
        res.status(201).json({"message": "Added meal"});
      }
    } catch (error) {
      res.status(500).json(error);
    }
};

const getById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const meal = await knex("meal").select("id", "title").where({id});
  
      meal.length === 0
      ? res.status(404).json({"error": "Meal not found"})
      : res.status(200).json(meal);
    } catch (error) {
      res.status(500).json(error);
    }
};

const updateById =  async (req, res) => {
    try {
      const id = req.params.id;
      const meal = req.body;
  
      const mealExists = await knex("meal").where({id}).select(1).first();
  
      if (!mealExists) {
        res.status(404).json({"error": "Meal not found"});
        return;
      } else if (mealExists) {
  
        if (Object.keys(meal).length === 0) {
          res.status(400).json({"error": "Please, enter a new meal information."});
          return;
        } else {
        await knex("meal").where({id}).update(meal);
        res.status(200).json({"message": "Updated meal"});
        }
        
      }
    } catch (error) {
      res.status(500).json(error);
    }
};

const deleteById = async (req, res) => {
    try {
      const id = req.params.id;
  
      const mealExists = await knex("meal").where({id}).select(1).first();
  
      await knex("meal").where({id}).del();
  
      !mealExists
      ? res.status(404).json({"error": "Meal not found"})
      : res.status(200).json({"message": "Deleted meal"});
    } catch (error) {
      res.status(500).json(error);
    }
};

module.exports = {
    getAll,
    addMeal,
    getById,
    updateById,
    deleteById
}