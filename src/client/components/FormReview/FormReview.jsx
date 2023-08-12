import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./FormReview.css";

const FormReview = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stars, setStars] = useState(5);
    const { id } = useParams();

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const reservationInfo = {
            title,
            description,
            meal_id: id,
            stars,
            created_date: formattedDate
        };

        try {
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reservationInfo)
            };

            const API = "/api/reviews";
            const res = await fetch (API, config);

            if (res.ok) {
                alert("Review added");
            } else {
                alert("Review has not been added");
            }
        } catch (err) {
            console.error(err);
        }

        setTitle(""),
        setDescription("");
        setStars(5);

    }
    return (
        <div className="form-review-layout">
            <h3>Add review:</h3>
            <form className="form-review" onSubmit={handleSubmit}>
                <input 
                    placeholder="Title*" 
                    className="input" 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea 
                    placeholder="Description*" 
                    className="textarea" 
                    type="text" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="8" 
                    cols="30"
                    required
                />
                <input 
                    placeholder="Stars*" 
                    className="input" 
                    type="number" 
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                    required
                />
                <button className="add-review">Add review</button>
            </form>
        </div>
    );
};

export default FormReview;