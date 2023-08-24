import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Meal from '../../components/Meal/Meal';
import Loader from '../../components/Loader/Loader';
import FormReservation from '../../components/FormReservation/FormReservation';
import "./MealInfo.css";

const MealInfo = () => {
    const { id } = useParams();
    
    const [meal, setMeal] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [avaliableReservations, setAvaliableReservations] = useState(0);

    const fetchMealById = async (id) => {
        try {
            setIsLoading(true)
            const API = `/api/meals/${id}`;
            const data = await fetch(API);
            const result = await data.json();
            if (data.status === 200 && data.statusText === "OK") {
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

    const fetchAvaliableReservations = async (id) => {
        try {
            const API = `/api/meals/avaliable-reservations/${id}`;
            const data = await fetch(API);
            const result = await data.json();
            const { max_reservations, reservated } = result;
            const countAvaliable = max_reservations - reservated;
            setAvaliableReservations(prev => prev + countAvaliable);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAvaliableReservations(id);
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
                            max_reservations={meal.max_reservations}
                            date={meal.when_date}
                            avaliable_reservations={avaliableReservations}
                            src={meal.src}
                        />
                        <Link to={`/meals/${id}/reviews/add-review`}>
                            <button className="review-meal">Reviews</button>
                        </Link>
                    </div>

                    <div className="meal-reservation">
                        {avaliableReservations > 0 ? (
                            <FormReservation id={id} avaliableReservations={avaliableReservations} /> 
                        ) : <div className="sold-out">Sold out!</div>}
                    </div>
                </>
            )
            }
        </div>
    );
      
};

export default MealInfo;