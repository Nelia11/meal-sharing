import React from 'react';
import "./ReadOnlyStarRating.css";

const ReadOnlyStarRating = ({ rating }) => {
    return (
        <div className="display-stars">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <span
                        key={index}
                        className={index <= rating ? "on" : "off"}
                    >
                        <span className="star">&#9733;</span>
                    </span>
                )
            })}
        </div>
    );
};

export default ReadOnlyStarRating;