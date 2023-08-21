import React from 'react';
import "./MealFilters.css"

const MealFilters = ({title, onTitleChange, onSortKeyChange, onSortDirChange }) => {
    return (
        <div className="row-wrap">
            <input className="searchInput" 
                placeholder="Search"
                value={title}
                onChange={(e) => onTitleChange(e.target.value)}
            />

            <div className="dropdown-row-wrap">
                <select onChange={(e) => onSortKeyChange(e.target.value)}>
                    <option value="">Sort by: </option>
                    <option value="when">Date</option>
                    <option value="max_reservations">Max. reservations</option>
                    <option value="price">Price</option>
                </select>

                <select onChange={(e) => onSortDirChange(e.target.value)}>
                    <option value="asc">⬆️</option>
                    <option value="desc">⬇️</option>
                </select>
            </div>

        </div>
    );
};

export default MealFilters;