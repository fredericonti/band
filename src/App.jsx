import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import LandingPage from './pages/LandingPage';
import UserRegister from './pages/UserRegister';
import FindBands from './pages/FindBands';
import FindArtists from './pages/FindArtists';
import FindVenues from './pages/FindVenues';
import BandProfile from './pages/BandProfile';
import BandPublicProfile from './pages/BandPublicProfile';
import Login from './pages/Login';
import { initGA, logPageView } from './config/analytics';

// Componente auxiliar para rastrear mudanças de rota
const RouteTracker = () => {
    const location = useLocation();

    useEffect(() => {
        logPageView();
    }, [location]);

    return null;
};

function App() {
    useEffect(() => {
        initGA();
    }, []);

    return (
        <Router>
            <RouteTracker />
            <div className="app-container">
                <Navbar />
                <main>
                    <AnimatedRoutes />
                </main>
            </div>
            <CustomCursor />
        </Router>
    );
}

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <PageTransition>
                        <LandingPage />
                    </PageTransition>
                } />
                <Route path="/login" element={
                    <PageTransition>
                        <Login />
                    </PageTransition>
                } />
                <Route path="/register" element={
                    <PageTransition>
                        <UserRegister />
                    </PageTransition>
                } />
                <Route path="/find-bands" element={
                    <PageTransition>
                        <FindBands />
                    </PageTransition>
                } />
                <Route path="/artists" element={
                    <PageTransition>
                        <FindArtists />
                    </PageTransition>
                } />
                <Route path="/venues" element={
                    <PageTransition>
                        <FindVenues />
                    </PageTransition>
                } />
                <Route path="/profile" element={
                    <PageTransition>
                        <BandProfile />
                    </PageTransition>
                } />
                <Route path="/band/:id" element={
                    <PageTransition>
                        <BandPublicProfile />
                    </PageTransition>
                } />
            </Routes>
        </AnimatePresence>
    );
};

export default App;
