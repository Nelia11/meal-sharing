const knex = require("../../database");
const { 
        filterByReservations, 
        filterByMaxPrice, 
        filterByTitle, 
        limitSearch,
        sortByKey,
        sortDir,
      } = require("../parameters/queryParams");

const getAll = async (req, res) => {
    let query = knex("meal").select(
      "meal.id", 
      "title",
      "description",
      "location",
      "when_date",
      "max_reservations",
      "price",
      "meal.created_date",
      "src"
    );

    if ("maxPrice" in req.query) {
      const maxPrice = req.query.maxPrice;
      if (!maxPrice || isNaN(maxPrice)) {
        return res.status(200).json({"error": "Price is not defined or invalid"});
      }
      query = filterByMaxPrice(maxPrice, query);
    };

    if ("availableReservations" in req.query) {
      const availableReservations = req.query.availableReservations.toLowerCase();
      if (!availableReservations) {
        return res.status(400).json({"error": "Type of reservation is not defined"});
      } else if (availableReservations !== "true" && availableReservations !== "false") {
        return res.status(400).json({"error": "Invalid type of reservation"});
      }
      query = filterByReservations(availableReservations, query);
    };

    if("title" in req.query) {
      const matchingTitle = req.query.title;
      if (!matchingTitle) {
        return res.status(400).json({"error": "Title is not defined"});
      }
      query = filterByTitle(matchingTitle, query);
    };

    if("dateAfter" in req.query) {
      const date = req.query.dateAfter;
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if(!date || (!datePattern.test(date)) ) {
        return res.status(400).json({"error": "Date is not defined or invalid"});
      }
      query = query.where("when_date", ">", date);
    };
    
    if("dateBefore" in req.query) {
      const date = req.query.dateBefore;
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;
      if(!date || (!datePattern.test(date)) ) {
        return res.status(400).json({"error": "Date is not defined or invalid"});
      }
      query = query.where("when_date", "<", date);
    };

    if("limit" in req.query) {
      const limitNumber = req.query.limit;
      if(!limitNumber) {
        return res.status(400).json({"error": "Limit is not defined"});
      } else if(isNaN(limitNumber)) {
        return res.status(400).json({"error": "Invalid limit"});
      }
      query = limitSearch(limitNumber, query);
    };

    if("sortDir" in req.query) {
      const direction = req.query.sortDir.toLowerCase();
      const sortingKey = req.query.sortKey;
      if (!sortingKey) {
        return res.status(400).json({"error": "Sorting key is not defined"});
      } else {
        sortingKey.toLowerCase();
      }

      if (!direction) {
        return res.status(400).json({"error": "Sorting direction is not defined"});
      } else if (sortingKey !== "when_date" && sortingKey !== "max_reservations" && sortingKey !== "price") {
        return res.status(400).json({"error": "Invalid sorting key"});
      } else if (direction !== "asc" && direction !== "desc") {
        return res.status(400).json({"error": "Invalid sorting direction"});
      }
      query = sortDir(sortingKey, direction, query);
    };

    if("sortKey" in req.query) {
      const sortingKey = req.query.sortKey.toLowerCase();
      if (!sortingKey) {
        return res.status(400).json({"error": "Sorting key is not defined"});
      } else if (sortingKey !== "when_date" && sortingKey !== "max_reservations" && sortingKey !== "price") {
        return res.status(400).json({"error": "Invalid sorting key"});
      }
      query = sortByKey(sortingKey, query);
    };
    
    try {
      const meals = await query;
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
        "when_date", 
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
  
      const meal = await knex("meal").select(
        "title", 
        "description", 
        "price", 
        "when_date",
        "max_reservations", 
        "src",
        ).where({id});
  
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

const getAvaliableCountById = async(req, res) => {
  try {
    const id = req.params.id;

    const mealExists = await knex("meal").where({id}).select(1).first();
    const result = await knex(`meal`)
    .select(`meal.id`, `title`, `max_reservations`)
    .sum(`number_of_guests as reservated`)
    .leftJoin(`reservation`, `meal.id`, `=`, `reservation.meal_id`)
    .groupBy(`meal.id`)
    .having(`meal.id`, `=`, `${id}`)
    .first();

    !mealExists 
    ? res.status(404).json({"error": "Meal not found"})
    : res.status(200).json(result);

  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
    getAll,
    addMeal,
    getById,
    updateById,
    deleteById,
    getAvaliableCountById
}