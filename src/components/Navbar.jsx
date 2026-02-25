import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import LoginSheet from './LoginSheet';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

const Navbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoginSheetOpen, setIsLoginSheetOpen] = useState(false);
    const [userType, setUserType] = useState('artist');
    const { user, logout } = useAuth();

    useEffect(() => {
        const storedType = localStorage.getItem('userType');
        if (storedType) setUserType(storedType);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

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

    const getFirstName = (str) => {
        if (!str) return 'PERFIL';
        // se for email, pega a parte antes do @
        if (str.includes('@')) return str.split('@')[0].toUpperCase();
        return str.split(' ')[0].toUpperCase();
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

                                {/* Botão do perfil com avatar */}
                                <button className="navbar-user-btn" onClick={handleProfileClick}>
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'Perfil'}
                                            className="navbar-avatar"
                                            referrerPolicy="no-referrer"
                                        />
                                    ) : (
                                        <div className="navbar-avatar-fallback">
                                            {getFirstName(user.displayName || user.email).charAt(0)}
                                        </div>
                                    )}
                                    <span className="navbar-username">
                                        {getFirstName(user.displayName || user.email)}
                                    </span>
                                </button>

                                <Button variant="outline" size="sm" className="login-navbar-btn" onClick={handleLogout}>
                                    SAIR
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="nav-link" onClick={closeMenu}>CADASTRAR</Link>
                                <Button size="sm" className="login-navbar-btn" onClick={openLoginSheet}>
                                    LOGIN
                                </Button>
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

