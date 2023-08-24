import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import "./ReviewInfo.css";
import FormReview from '../../components/FormReview/FormReview';
import ReadOnlyStarRating from '../../components/ReadOnlyStarRating/ReadOnlyStarRating';
import NotFound from '../NotFound/NotFound';
import StarRatings from "react-star-ratings";
const AvarageRating = StarRatings;

const ReviewInfo = () => {
    const { id } = useParams();

    const [meal, setMeal] = useState("");
    const [reviews, setReviews] = useState([]);
    const [avgRate, setAvgRate] = useState(0);
    const [error, setError] = useState(null);

    const getReviews = async (id) => { 
        try {
            const API = `/api/reviews/${id}/meal-reviews`;
            const data = await fetch(API);
            const result = await data.json();
            if (data.status === 200 && data.statusText === "OK") {
                const { title, meal, reviews, avgRate } = result;
                setMeal(meal || title);
                setReviews(reviews);
                setAvgRate(avgRate);
            } else {
                setError(result.error);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getReviews(id);
    }, [])

    return (
        <div className="meal-reviews-layout">
            { error ?
            <NotFound />
            : <div className="content"> 
            <Link to={`/meals/${id}`}><h3> {meal} </h3></Link>
            <AvarageRating 
                starDimension="30px"
                rating={avgRate}
                starRatedColor={"rgb(218, 165, 32)"}
            />
            <FormReview />
            {reviews ? 
            reviews.length > 0 && 
            reviews.map(review => 
                <div key={review.id} className="review-card">
                    <div className="review-title">{review.title}</div>
                    <div>{review.description}</div>
                    <div>{new Date(review.posted).toLocaleString()}</div>
                    <ReadOnlyStarRating 
                        rating={review.stars}
                    />
                </div>
            )
             : <div className="no-reviews">No reviews</div>}
            </div>
            }
        </div>
    );
};

export default ReviewInfo;