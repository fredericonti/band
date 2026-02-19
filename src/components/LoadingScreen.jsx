import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loader-spinner"></div>
            <p className="loader-text">CARREGANDO...</p>
        </div>
    );
};

export default LoadingScreen;
