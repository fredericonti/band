import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, sendEmailLoginLink } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import './LoginSheet.css';

const LoginSheet = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [step, setStep] = useState('initial'); // initial | email-input | email-sent
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

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

    // Se o usuário logar, fecha o sheet e redireciona
    useEffect(() => {
        if (user && isOpen) {
            onClose();
            navigate('/register');
        }
    }, [user, isOpen]);

    // Reset ao fechar
    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setStep('initial');
                setEmail('');
                setError('');
            }, 300);
        }
    }, [isOpen]);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            await signInWithGoogle();
            // AuthContext detecta e o useEffect acima redireciona
        } catch (err) {
            console.error('Erro no login Google:', err);
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Login cancelado.');
            } else if (err.code === 'auth/popup-blocked') {
                setError('Popup bloqueado. Permita popups para este site.');
            } else {
                setError('Erro ao entrar com Google. Tente novamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Insira um e-mail válido.');
            return;
        }

        setIsLoading(true);
        setError('');
        try {
            await sendEmailLoginLink(email);
            setStep('email-sent');
        } catch (err) {
            console.error('Erro ao enviar link:', err);
            setError('Erro ao enviar o link. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
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
                            <h2>Entrar no Tonare</h2>
                            <button className="login-close" onClick={onClose}>
                                <X size={24} />
                            </button>
                        </div>

                        {error && (
                            <div className="login-sheet-error">{error}</div>
                        )}

                        {/* ── Tela inicial ── */}
                        {step === 'initial' && (
                            <div className="social-login">
                                <button
                                    className="btn btn-social btn-google-real"
                                    onClick={handleGoogleLogin}
                                    disabled={isLoading}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    {isLoading ? 'Aguarde...' : 'Continuar com Google'}
                                </button>

                                <div className="sheet-divider">
                                    <span>ou</span>
                                </div>

                                <button
                                    className="btn btn-social"
                                    onClick={() => setStep('email-input')}
                                >
                                    <Mail size={20} />
                                    Continuar com E-mail
                                </button>
                            </div>
                        )}

                        {/* ── Formulário de email ── */}
                        {step === 'email-input' && (
                            <div className="email-login">
                                <p className="sheet-hint">
                                    Enviaremos um link mágico para o seu e-mail. Sem senha!
                                </p>
                                <form onSubmit={handleEmailSubmit}>
                                    <input
                                        type="email"
                                        placeholder="seu@email.com"
                                        className="input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoFocus
                                    />
                                    <div className="login-actions" style={{ marginTop: '1rem' }}>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            style={{ width: '100%' }}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Enviando...' : 'Enviar Link de Acesso'}
                                        </button>
                                        <button
                                            type="button"
                                            className="btn"
                                            style={{ width: '100%' }}
                                            onClick={() => { setStep('initial'); setError(''); }}
                                        >
                                            Voltar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* ── Link enviado ── */}
                        {step === 'email-sent' && (
                            <div className="email-sent-state">
                                <CheckCircle size={48} strokeWidth={1.5} />
                                <h3>Link enviado!</h3>
                                <p>
                                    Verifique sua caixa de entrada em<br />
                                    <strong>{email}</strong>
                                </p>
                                <p className="sheet-hint">
                                    Clique no link do e-mail para entrar.<br />
                                    Expira em 10 minutos.
                                </p>
                                <button
                                    className="btn-link"
                                    onClick={() => { setStep('email-input'); setError(''); }}
                                >
                                    Usar outro e-mail
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LoginSheet;
