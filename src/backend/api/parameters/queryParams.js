const knex = require("../../database");

const filterByMaxPrice = (price, query) => {
    return query.where("price", "<", price);
};

const filterByReservations = (availableReservations, query) => {
    query = query
    .select(
        knex.raw("COUNT(reservation.number_of_guests) AS total_guests"),
        knex.raw("meal.max_reservations - COUNT(reservation.number_of_guests) AS available_reservation"))
    .leftJoin("reservation", {"meal.id": "reservation.meal_id"})
    .groupBy("meal.id");

    if (availableReservations === "true") {
        query = query.having(knex.raw("meal.max_reservations - COUNT(reservation.number_of_guests) >= 1"));
    } else if (availableReservations === "false") {
        query = query.having(knex.raw("meal.max_reservations - COUNT(reservation.number_of_guests) = 0"));
    }
    return query;
};

const filterByTitle = (title, query) => {
    return query.where("title", "ILIKE", `%${title}%`);
};

const limitSearch = (limit, query) => {
    return query.limit(Number(limit));
};

const sortByKey = (key, query) => {
    if (key === "when_date"){
        query = query.orderBy("meal.when_date");
    } else if (key === "max_reservations") {
        query = query.orderBy("max_reservations");
    } else if (key === "price") {
        query = query.orderBy("price");
    } 
    return query;
};

const sortDir = (key, direction, query) => {
    if (direction === "asc") {
        query = query.orderBy(key, "asc");
    } else if (direction.toLowerCase() === "desc") {
        query = query.orderBy(key, "desc");
    }
    return query;
}

module.exports = { 
    filterByReservations,
    filterByMaxPrice,
    filterByTitle,
    limitSearch,
    sortByKey,
    sortDir
}