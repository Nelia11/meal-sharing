import React, {useEffect, useState} from "react";
import Meal from "../../components/Meal/Meal";
import Loader from "../../components/UI/Loader/Loader";
import "./MealsList.css";
import { Link } from "react-router-dom";

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
            <div className="container">

                <div className="top-wave">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                        <path
                            fill="#FFA500"
                            fillOpacity="1"
                            d="M0,64L24,90.7C48,117,96,171,144,170.7C192,171,240,117,288,122.7C336,128,384,192,432,213.3C480,235,528,213,576,197.3C624,181,672,171,720,160C768,149,816,139,864,128C912,117,960,107,1008,90.7C1056,75,1104,53,1152,74.7C1200,96,1248,160,1296,170.7C1344,181,1392,139,1416,117.3L1440,96L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z">
                        </path>
                    </svg>
                </div>

                <div className="list">
                    <h2>Meals</h2>

                    <div className="row-wrap">
                        <input className="searchInput" 
                            placeholder="Search"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <div>
                            <select onChange={(e) => setSortKey(e.target.value)}>
                                <option value="">Sort by</option>
                                <option value="when">Date</option>
                                <option value="max_reservations">Max. reservations</option>
                                <option value="price">Price</option>
                            </select>

                            <select onChange={(e) => setSortDir(e.target.value)}>
                                <option value="">Sort Direction</option>
                                <option value="asc">ASC</option>
                                <option value="desc">DESC</option>
                            </select>
                        </div>

                    </div>


                    {isLoading && (
                        <div className="my-loader"><Loader /></div>
                    )}

                    <div className="list-table">
                        {meals.map((meal) =>
                            (<div key={meal.id}>
                                <Link to={`/meals/${meal.id}`}>
                                    <Meal
                                        title={meal.title}
                                        description={meal.description}
                                        price={meal.price}
                                        src={meal.src}
                                    />
                                </Link>
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