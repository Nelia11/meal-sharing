import React, {useEffect, useState} from "react";
import Meal from "../../components/Meal/Meal";
import Loader from "../../components/Loader/Loader";
import "./MealsList.css";
import { Link } from "react-router-dom";
import MealFilters from "../../components/MealFilters/MealFilters";
import MealListTopWave from "../../components/Waves/MealsListTopWave/MealListTopWave";
import MealListBottomWave from "../../components/Waves/MealsListBottomWave/MealListBottomWave";

const MealsList = () => {
    const API = "/api/meals";

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortDir, setSortDir] = useState("asc");

    const fetchMeals = async (url) => {
        try {
            const data = await fetch(url);
            const result = await data.json();
            setMeals(result);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let searchURL = title ? `${API}?title=${title}` : `${API}?`;
        if (sortKey && sortDir) {
            searchURL += `&sortKey=${sortKey}&sortDir=${sortDir}`;
        }
        fetchMeals(searchURL);
    }, [title, sortKey, sortDir]);

    return (
            <>
                <MealListTopWave />
                <div className="list">
                    <h2>Meals</h2>
                    <MealFilters 
                        title={title}
                        onTitleChange={setTitle}
                        onSortKeyChange={setSortKey}
                        onSortDirChange={setSortDir}
                    />
                    {isLoading && (
                        <div className="my-loader"><Loader /></div>
                    )}
                    {meals.length > 0 ? 
                    meals.map((meal) => (
                        <div className="list-table" key={meal.id}>
                            <Link to={`/meals/${meal.id}`}>
                                <Meal 
                                    title={meal.title}
                                    description={meal.description}
                                    price={meal.price}
                                    max_reservations={meal.max_reservations}
                                    date={meal.when_date}
                                    src={meal.src}
                                />
                            </Link>
                        </div>
                    ))
                    : "Not found"}
                </div>
                <MealListBottomWave />
            </>
    );
};

export default MealsList;