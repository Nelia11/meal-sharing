const express = require("express");
const router = express.Router();
const knex = require("../database");

// /api/reservations	GET,	Returns all reservations
router.get("/", async (req, res) => {
    try {
        const reservations = await knex("reservation").select("id", "contact_name", "number_of_guests", "contact_phonenumber", "created_date");
        
        reservations.length === 0
        ? res.status(404).send("Reservations not found")
        : res.status(200).send(reservations);
    } catch (error) {
        res.status(500).json(error);
    }
});


// /api/reservations	POST,	Adds a new reservation to the database
router.post("/", async (req, res) => {
    try {
        const reservation = req.body;

        const addReservation = await knex("reservation").insert(reservation);
        res.status(201).send({"message": "Added reservation"});
    } catch (error) {
        res.status(500).json(error);
    }
});

// /api/reservations/:id	GET,	Returns a reservation by id
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);

        const reservation = await knex("reservation").select("id", "contact_name", "number_of_guests", "contact_phonenumber", "created_date").where({id});
        
        reservation.length === 0
        ? res.status(404).send("Reservation not found")
        : res.status(200).send(reservation);
    } catch (error) {
        res.status(500).json(error);
    }
});

// /api/reservations/:id	PUT,	Updates the reservation by id
router.put("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const reservation = req.body;

        const reservations = await knex("reservation").select("id");
        const updateReservation = await knex("reservation").where({id}).update(reservation);
        
        id > reservations.length
        ? res.status(404).send("Reservation not found")
        : res.status(200).send({"message": "Updated reservation"});
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async (req, res) =>{
    try {
        const id = Number(req.params.id);

        const reservations = await knex("reservation").select("id");
        const deleteReservation = await knex("reservation").where({id}).del();
        
        id > reservations.length
        ? res.status(404).send("Reservation not found")
        : res.status(200).send({"message": "Deleted reservation"});
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;