import React from "react";
import "./Meal.css"

const Meal = ({title, description, price, max_reservations, avaliable_reservations, src }) => {
    return (
        <div className="card-wrap">
            <div className="info">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
                <div className="price">{price} dkk</div>
                <div className="max_reservations">Max. reservations: {max_reservations}</div>
                {avaliable_reservations >= 0 && <div className="avaliable_reservations">Avaliable reservations: {avaliable_reservations}</div>}
            </div>

            <div className="photo">
                <img src={src} alt="dish"/>
            </div>
        </div>
    );
};

export default Meal;