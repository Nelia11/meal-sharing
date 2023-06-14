const express = require("express");
const reservationRouter = express.Router();
const { getAll, addReservation, getById, updateById, deleteById } = require("./controllers/reservationControllers");

// /api/reservations	GET, Returns all reservations
reservationRouter.get("/", getAll);

// /api/reservations	POST, Adds a new reservation to the database
reservationRouter.post("/", addReservation);

// /api/reservations/:id	GET, Returns a reservation by id
reservationRouter.get("/:id", getById);

// /api/reservations/:id	PUT, Updates the reservation by id
reservationRouter.put("/:id", updateById);

// /api/reservations/:id	DELETE,	Deletes the reservation by id
reservationRouter.delete("/:id", deleteById);

module.exports = reservationRouter;