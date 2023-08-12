import React from "react";
import "./Meal.css"

const Meal = ({title, description, price, src}) => {
    return (
        <div className="card-wrap">
            <div className="info">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
                <div className="price">{price}</div>
            </div>

            <div className="photo">
                <img src={src} alt="dish"/>
            </div>
        </div>
    );
};

export default Meal;