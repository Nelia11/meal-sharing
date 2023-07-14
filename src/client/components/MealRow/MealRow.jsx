import React from "react";
import "./MealRow.css"

const MealRow = ({title, description, price}) => {
    return (
        <div className="row-wrap">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
            <div className="price" >{price}</div>
        </div>
    );
};

export default MealRow;