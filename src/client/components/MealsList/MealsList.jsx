import React, {useEffect, useState} from "react";
import MealRow from "../MealRow/MealRow";
import Loader from "../UI/Loader/Loader";
import "./MealsList.css"

const MealsList = () => {
    const API = "/api/meals";

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMeals = async (url) => {
        try {
            const data = await fetch(url);
            const result = await data.json();
            setMeals((lastState) => lastState.concat(result));
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMeals(API);
    }, []);

    return (
        <div className="container">

            <div className="top-wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path 
                        fill="#FFA500" 
                        fillOpacity="1" 
                        d="M0,160L48,176C96,192,192,224,288,245.3C384,267,480,277,576,245.3C672,213,768,139,864,117.3C960,96,1056,128,1152,154.7C1248,181,1344,203,1392,213.3L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
                    </path>
                </svg>
            </div>

            <div className="card">
                <h2>Meals</h2>
                
                <div className="list-title">
                    <div>Title</div>
                    <div>Description</div>
                    <div>Price</div>
                </div>

                {isLoading && (
                    <div className="my-loader"><Loader /></div>
                )}

                <div className="list-table">
                    {meals.map((meal) => 
                        (<div key={meal.id}>
                            <MealRow 
                                title={meal.title}
                                description={meal.description}
                                price={meal.price}
                            />
                        </div>)
                    )}
                </div>
            </div>

            <div className="bottom-wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path 
                        fill="#FFA500" 
                        fillOpacity="1" 
                        d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
                    </path>
                </svg>
            </div>

        </div>
    );
};

export default MealsList;