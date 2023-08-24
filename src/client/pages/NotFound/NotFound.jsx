import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="not-found">
            <img src="https://meal-sharing-photos.s3.eu-north-1.amazonaws.com/404.jpg"/>
            <Link to="/">
                <button>Go home</button>
            </Link>
        </div>
    );
};

export default NotFound;