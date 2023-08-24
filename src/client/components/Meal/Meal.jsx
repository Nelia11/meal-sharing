import React from "react";
import "./Meal.css"

const Meal = ({title, description, price, date, max_reservations, avaliable_reservations, src }) => {
    const formatDate = (rawDate) => {
        const options = {
            day: "numeric",
            month: "long",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        };

        const formattedDate = new Date(rawDate).toLocaleDateString("en-US", options)
        return formattedDate;
    }
    
    return (
        <div className="card-wrap">
            <div className="info">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
                <div className="price">{price} dkk</div>
                <div className="date">Collect on: {formatDate(date)} </div>
                <div className="max_reservations">Max. reservations: {max_reservations}</div>
                {avaliable_reservations >= 0 && <div className="avaliable_reservations">Avaliable reservations: {avaliable_reservations}</div>}
            </div>

            <div className="photo">
                <img src={src} alt="meal"/>
            </div>
        </div>
    );
};

export default Meal;