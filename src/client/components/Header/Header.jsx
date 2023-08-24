import React from 'react';
import Nav from '../Nav/Nav';
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <img src="https://meal-sharing-photos.s3.eu-north-1.amazonaws.com/logo.png" alt="Logo"/>
            <Nav />
        </div>
    );
};

export default Header;