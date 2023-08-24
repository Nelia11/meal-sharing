import React from 'react';
import "./StarRating.css";

const StarRating = ({ rating, handleStarClick, hover, handleStarHover }) => {
    
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= ((rating && hover) || hover) ? "on" : "off"}
                        onClick={() => handleStarClick(index)}
                        onMouseEnter={() => handleStarHover(index)}
                        onMouseLeave={() => handleStarHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                )
            })}
        </div>
    );
};

export default StarRating;