import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingScreen from './components/LoadingScreen';
import { initGA, logPageView } from './config/analytics';

// Lazy loading das páginas para reduzir bundle inicial
const LandingPage = lazy(() => import('./pages/LandingPage'));
const UserRegister = lazy(() => import('./pages/UserRegister'));
const FindBands = lazy(() => import('./pages/FindBands'));
const FindArtists = lazy(() => import('./pages/FindArtists'));
const FindVenues = lazy(() => import('./pages/FindVenues'));
const BandProfile = lazy(() => import('./pages/BandProfile'));
const BandPublicProfile = lazy(() => import('./pages/BandPublicProfile'));
const ArtistDashboard = lazy(() => import('./pages/ArtistDashboard'));
const VenueDashboard = lazy(() => import('./pages/VenueDashboard'));
const Login = lazy(() => import('./pages/Login'));
const TokenShowcase = lazy(() => import('./pages/TokenShowcase'));

const RouteTracker = () => {
    const location = useLocation();
    useEffect(() => { logPageView(); }, [location]);
    return null;
};

function App() {
    useEffect(() => { initGA(); }, []);

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
        <Suspense fallback={<LoadingScreen />}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {/* ── Rotas públicas ── */}
                    <Route path="/" element={
                        <PageTransition><LandingPage /></PageTransition>
                    } />
                    <Route path="/login" element={
                        <PageTransition><Login /></PageTransition>
                    } />
                    <Route path="/find-bands" element={
                        <PageTransition><FindBands /></PageTransition>
                    } />
                    <Route path="/artists" element={
                        <PageTransition><FindArtists /></PageTransition>
                    } />
                    <Route path="/venues" element={
                        <PageTransition><FindVenues /></PageTransition>
                    } />
                    <Route path="/band/:id" element={
                        <PageTransition><BandPublicProfile /></PageTransition>
                    } />
                    <Route path="/tokens" element={
                        <PageTransition><TokenShowcase /></PageTransition>
                    } />

                    {/* ── Rotas protegidas (requerem login) ── */}
                    <Route path="/register" element={
                        <ProtectedRoute>
                            <PageTransition><UserRegister /></PageTransition>
                        </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <PageTransition><ArtistDashboard /></PageTransition>
                        </ProtectedRoute>
                    } />
                    <Route path="/venue-dashboard" element={
                        <ProtectedRoute>
                            <PageTransition><VenueDashboard /></PageTransition>
                        </ProtectedRoute>
                    } />
                    <Route path="/band-profile" element={
                        <ProtectedRoute>
                            <PageTransition><BandProfile /></PageTransition>
                        </ProtectedRoute>
                    } />
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};

export default App;

