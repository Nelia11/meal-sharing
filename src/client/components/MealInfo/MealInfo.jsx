import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Meal from '../Meal/Meal';
import Loader from '../UI/Loader/Loader';
import FormReservation from '../FormReservation/FormReservation';
import "./MealInfo.css";

const MealInfo = () => {
    const { id } = useParams();
    
    const [meal, setMeal] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [avaliableReservation, setAvaliableReservation] = useState("");

    const fetchMealById = async (id) => {
        try {
            setIsLoading(true)
            const API = `/api/meals/${id}`;
            const data = await fetch(API);
            const result = await data.json();
            if (data.status === 200) {
                setMeal(...result);
            } else if (data.status === 404) {
                setError(result.error);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const fetchAvaliableReservation = async (id) => {
        try {
            const API = `/api/meals/avaliable-reservations/${id}`;
            const data = await fetch(API);
            const result = await data.json();
            const { max_reservations, reservated } = result;
            const countAvaliable = max_reservations - reservated;
            setAvaliableReservation(countAvaliable);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAvaliableReservation(id);
        fetchMealById(id);
    }, [id]);

    return (

        <div className="meal-info">

            {isLoading ? (
                <Loader />
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                    <div className="meal-add-review">
                        <Meal 
                            title={meal.title}
                            description={meal.description}
                            price={meal.price}
                            src={meal.src}
                        />
                        <Link to={`/meals/${id}/reviews/add-review`}>
                            <button className="review-meal">Review meal</button>
                        </Link>
                    </div>

                    {avaliableReservation > 0 ? (
                        <FormReservation id={id}/> 
                    ) : "Sold out!" }

                </>
            )
            }
        </div>
    );
      
};

export default MealInfo;