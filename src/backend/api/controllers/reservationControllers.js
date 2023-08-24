const knex = require("../../database");

const getAll = async (req, res) => {
    try {
        const reservations = await knex("reservation")
        .select(
            "id", 
            "contact_name", 
            "number_of_guests", 
            "contact_phonenumber", 
            "created_date",
            "meal_id"
        );
        
        reservations.length === 0
        ? res.status(404).json({"error": "Reservations not found"})
        : res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json(error);
    }
};

const addReservation = async (req, res) => {
    try {
        const reservation = req.body;

        const requiredFields = [ 
            "number_of_guests", 
            "created_date", 
            "contact_phonenumber", 
            "contact_name",
            "contact_email",
            "meal_id"
        ];

        const reqNumber = [
            "number_of_guests", 
            "contact_phonenumber",
            "meal_id"
        ];

        const missingMandatoryField = requiredFields.some((field)=> !req.body[field]);
        const notNumber = reqNumber.some((field) => isNaN(reservation[field]));

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const invalidEmail = !emailPattern.test(reservation.contact_email);

        if (missingMandatoryField) {
            res.status(400).json({"error": "Incomplite reservation data"});
            return;
        } else if (notNumber) {
            res.status(400).json({"error": "Invalid type. Expected Number"});
            return;
        } else if (invalidEmail) {
            res.status(400).json({"error": "Invalid email format"});
            return;
        } else {
            await knex("reservation").insert(reservation);
            res.status(201).json({"message": "Added reservation"});
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const getById = async (req, res) => {
    try {
        const id = req.params.id;

        const reservation = await knex("reservation").select("id", "contact_name", "number_of_guests", "contact_phonenumber", "created_date").where({id});
        
        reservation.length === 0
        ? res.status(404).json({"error": "Reservation not found"})
        : res.status(200).json(reservation);
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateById = async (req, res) => {
    try {
        const id = req.params.id;
        const reservation = req.body;

        const reservationExist = await knex("reservation").where({id}).select(1).first();

        if (!reservationExist) {
            res.status(404).json({"error": "Reservation not found"});
            return;
        } else if (reservationExist) {

            if (Object.keys(reservation).length === 0) {
                res.status(400).json({"error": "Please, enter a new reservation information."});
                return;
              } else {
              await knex("reservation").where({id}).update(reservation);
              res.status(200).json({"message": "Updated reservation"});
              }
            
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const deleteById = async (req, res) =>{
    try {
        const id = req.params.id;

        const reservationExist = await knex("reservation").where({id}).select(1).first();
        await knex("reservation").where({id}).del();
        
        !reservationExist
        ? res.status(404).json({"error": "Reservation not found"})
        : res.status(200).json({"message": "Deleted reservation"});
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    getAll,
    addReservation,
    getById,
    updateById,
    deleteById
}