import React from 'react';
import Nav from '../Nav/Nav';
import "./Header.css";

const Header = () => {
    return (
        <div className="header">
            <img src="src/client/assets/images/logo.png"/>
            <Nav />
        </div>
    );
};

export default Header;