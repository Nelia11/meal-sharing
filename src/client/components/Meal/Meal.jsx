import React from "react";
import "./Meal.css"

const Meal = ({title, description, price}) => {
    return (
        <div className="row-wrap">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
            <div className="price" >{price}</div>
        </div>
    );
};

export default Meal;