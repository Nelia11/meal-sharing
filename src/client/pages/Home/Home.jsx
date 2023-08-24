import React, {useEffect, useState} from "react";
import "./Home.css"
import Meal from '../../components/Meal/Meal';
import { Link } from "react-router-dom";
import HomeTopWave from "../../components/Waves/HomeTopWave/HomeTopWave";

const Home = () => {
    const API = "/api/meals";
    const [meals, setMeals] = useState([]);

    const fetchMeals = async (url) => {
        try {
            const data = await fetch(url);
            const result = await data.json();
            const featuredMeals = result.slice(0, 2);
            setMeals(featuredMeals);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMeals(API);
    }, []);

    return (
        <div className="main">
            <HomeTopWave />
            <Link to="/meals">
                <button className="see-more-btn">See more</button>
            </Link>
            <div className="list-table">
                {meals.map((meal) =>
                    (<div key={meal.id}>
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
                    </div>)
                )}
            </div>
        </div>
    );
};

export default Home;