const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const reservationsRouter = require("./api/reservations");

const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

const knex = require("./database");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reservations", reservationsRouter);

// /future-meals: Respond with all meals in the future (relative to the when datetime)
app.get("/future-meals", async (req, res) => {
  try {
    const meals = await knex.raw("SELECT `title`, `when` FROM `meal` WHERE `when` > now()");
    res.status(200).json(meals[0]);
  } catch (error) {
    res.status(500).json("500. Internal Server Error: " + error);
  }
});

// /past-meals:	Respond with all meals in the past (relative to the when datetime)
app.get("/past-meals", async(req, res) => {
  try {
    const meals = await knex.raw("SELECT `title`, `when` FROM `meal` WHERE `when` < now()");
    res.status(200).json(meals[0]);
  } catch (error) {
    res.status(500).json("500. Internal Server Error: " + error);
  }
});

// /all-meals: Respond with all meals sorted by ID
app.get("/all-meals", async(req, res) => {
  try {
    const meals = await knex.raw("SELECT `id`, `title` FROM `meal` ORDER BY `id` ASC");
    res.status(200).json(meals[0]);
  } catch (error) {
    res.status(500).json("500. Internal Server Error: " + error);
  }
});

// /first-meal:	Respond with the first meal (meaning with the minimum id)
app.get("/first-meal", async(req, res) => {
  try {
    const meal = await knex.raw("SELECT `id`, `title` FROM `meal` ORDER BY `id` ASC LIMIT 1");
    
    meal[0].length === 0 
    ? res.status(404).json("404. Meal not found.")
    : res.status(200).json(meal[0][0]);
  } catch (error) {
    res.status(500).json("500. Internal Server Error: " + error);
  }
});

// /last-meal: Respond with the last meal (meaning with the maximum id)
app.get("/last-meal", async(req, res) => {
  try {
    const meal = await knex.raw("SELECT `id`, `title` FROM `meal` ORDER BY `id` DESC LIMIT 1");
    
    meal[0].length === 0
    ? res.status(404).json("404. Meal not found.")
    : res.status(200).json(meal[0][0]);
  } catch (error) {
    res.status(500).json("500. Internal Server Error: " + error);
  }
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;