import React from 'react';
import "./Footer.css"

const Footer = () => {
    return (
        <div className="footer-layout">
            &#169; 2023  
            <a 
                href="https://www.hackyourfuture.dk/"
                target="_blank" 
                rel="noopener noreferrer"
            >  HackYourFuture - Denmark</a>
        </div>
    );
};

export default Footer;