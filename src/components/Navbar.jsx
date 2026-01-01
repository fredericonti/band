
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import LoginSheet from './LoginSheet';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [isLoginSheetOpen, setIsLoginSheetOpen] = React.useState(false);
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
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

    const getFirstName = (fullName) => {
        return fullName ? fullName.split(' ')[0] : 'PERFIL';
    };

    return (
        <>
            <nav className="navbar">
                <div className="container navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMenu}>
                        CODA
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
                                <Link to="/profile" className="nav-link login-btn" onClick={closeMenu}>
                                    {getFirstName(user.displayName).toUpperCase()}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="nav-link" onClick={closeMenu}>CADASTRAR</Link>
                                <button className="nav-link login-btn" onClick={openLoginSheet}>
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
