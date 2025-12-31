import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Facebook, Github } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './LoginSheet.css';

const LoginSheet = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleEmailLogin = (e) => {
        e.preventDefault();
        onClose();
        navigate('/login'); // For now, redirect to full login page or handle auth logic here
    };

    const variants = {
        hidden: isMobile ? { y: '100%' } : { x: '100%' },
        visible: isMobile ? { y: 0 } : { x: 0 },
        exit: isMobile ? { y: '100%' } : { x: '100%' }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="login-sheet-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    <motion.div
                        className="login-sheet-container"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="login-header">
                            <h2>Entrar no Band</h2>
                            <button className="login-close" onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="social-login">
                            <button className="btn btn-social">
                                <Github size={20} />
                                Continuar com Github
                            </button>
                            <button className="btn btn-social" style={{ color: '#1877F2', borderColor: '#1877F2' }}>
                                <Facebook size={20} />
                                Continuar com Facebook
                            </button>
                            <button className="btn btn-social" style={{ color: '#DB4437', borderColor: '#DB4437' }}>
                                <Mail size={20} />
                                Continuar com Google
                            </button>
                        </div>

                        <div className="email-login">
                            <p style={{ marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center' }}>Ou entre com seu e-mail</p>
                            <form onSubmit={handleEmailLogin}>
                                <input type="email" placeholder="Seu e-mail" className="input" required />
                                <input type="password" placeholder="Sua senha" className="input" required />
                                <div className="login-actions">
                                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                        Entrar
                                    </button>
                                    <button type="button" className="btn" style={{ width: '100%' }} onClick={() => { onClose(); navigate('/register'); }}>
                                        Não tem conta? Cadastre-se
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LoginSheet;
