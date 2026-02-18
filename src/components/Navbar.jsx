import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import LoginSheet from './LoginSheet';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);
    const [userType, setUserType] = useState('artist'); // artist or venue
    const { user, logout } = useAuth();

    useEffect(() => {
        const storedType = localStorage.getItem('userType');
        if (storedType) setUserType(storedType);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const openLoginSheet = (e) => {
        e.preventDefault();
        closeMenu();
        setIsLoginSheetOpen(true);
    };

    const handleProfileClick = (e) => {
        e.preventDefault();
        closeMenu();
        navigate(userType === 'artist' ? '/profile' : '/venue-dashboard');
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        closeMenu();
        await logout();
        navigate('/');
    };

    const getFirstName = (fullName) => {
        return fullName ? fullName.split(' ')[0] : 'PERFIL';
    };

    return (
        <>
            <nav className="navbar">
                <div className="container navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMenu}>
                        TONARE
                    </Link>

                    <button
                        className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/venues" className="nav-link" onClick={closeMenu}>ESTABELECIMENTOS</Link>
                        <Link to="/artists" className="nav-link" onClick={closeMenu}>ARTISTAS</Link>
                        {user ? (
                            <>
                                <Link to="/register" className="nav-link" onClick={closeMenu}>CADASTRAR</Link>
                                <button className="nav-link login-btn" onClick={handleProfileClick}>
                                    {getFirstName(user.displayName || user.email).toUpperCase()}
                                </button>
                                <button className="btn btn-outline btn-sm login-navbar-btn" onClick={handleLogout}>
                                    SAIR
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="nav-link" onClick={closeMenu}>CADASTRAR</Link>
                                <button className="btn btn-primary btn-sm login-navbar-btn" onClick={openLoginSheet}>
                                    LOGIN
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <LoginSheet isOpen={isLoginSheetOpen} onClose={() => setIsLoginSheetOpen(false)} />
        </>
    );
};

export default Navbar;
