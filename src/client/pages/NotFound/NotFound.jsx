import React from 'react';
import { Link } from 'react-router-dom';
import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="not-found">
            <img src="src/client/assets/images/404.jpg"/>
            <Link to="/">
                <button>Go home</button>
            </Link>
        </div>
    );
};

export default NotFound;