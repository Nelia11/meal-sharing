import React from 'react';
import "./HomeTopWave.css";

const HomeTopWave = () => {
    return (
        <div className="wave-container">
            <p>Check out our awesome meals!</p>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path 
                    fill="#FFF" 
                    d="M0,192L40,176C80,160,160,128,240,133.3C320,139,400,181,480,208C560,235,640,245,720,240C800,235,880,213,960,181.3C1040,149,1120,107,1200,101.3C1280,96,1360,128,1400,144L1440,160L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z">
                </path>
            </svg>
        </div>
    );
};

export default HomeTopWave;