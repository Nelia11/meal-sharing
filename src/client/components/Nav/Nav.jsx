import React from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";

const Nav = () => {
    return (
        <div>
            <nav>
                <div>
                    <Link to="/">Home</Link>
                </div>
                <div>
                    <Link to="/about">About</Link>
                </div>
                <div>
                    <Link to="/meals">Meals</Link>
                </div>
            </nav>
        </div>
    );
};

export default Nav;