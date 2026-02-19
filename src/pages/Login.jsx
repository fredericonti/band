import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, CheckCircle } from 'lucide-react';
import { signInWithGoogle, sendEmailLoginLink, completeEmailSignIn, isEmailSignInLink } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const [step, setStep] = useState('initial');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Rota de destino: onde o usuário tentou ir antes do login
    const from = location.state?.from?.pathname || '/register';

    // Se já está logado, redireciona para a rota original (ou /register)
    useEffect(() => {
        if (user) {
            navigate(from, { replace: true });
        }
    }, [user, navigate, from]);

    // Verifica se a URL atual é um link de login por email (magic link)
    useEffect(() => {
        if (isEmailSignInLink(window.location.href)) {
            setStep('completing');
            const savedEmail = window.localStorage.getItem('emailForSignIn');

            const finishSignIn = async (emailToUse) => {
                try {
                    await completeEmailSignIn(emailToUse, window.location.href);
                    // onAuthStateChanged no AuthContext vai detectar e redirecionar
                } catch (err) {
                    console.error('Erro ao completar login:', err);
                    setError('Link inválido ou expirado. Tente novamente.');
                    setStep('initial');
                }
            };

            if (savedEmail) {
                finishSignIn(savedEmail);
            } else {
                // Email não encontrado no localStorage (abriu em outro dispositivo)
                const emailInput = window.prompt('Por favor, confirme seu e-mail para entrar:');
                if (emailInput) {
                    finishSignIn(emailInput);
                } else {
                    setStep('initial');
                }
            }
        }
    }, []);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            await signInWithGoogle();
            // AuthContext detecta e redireciona via useEffect acima
        } catch (err) {
            console.error('Erro no login Google:', err);
            if (err.code === 'auth/popup-closed-by-user') {
                setError('Login cancelado. Tente novamente.');
            } else if (err.code === 'auth/popup-blocked') {
                setError('Popup bloqueado pelo navegador. Permita popups para este site.');
            } else {
                setError('Erro ao entrar com Google. Tente novamente.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError('Por favor, insira um e-mail válido.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            await sendEmailLoginLink(email);
            setStep('email-sent');
        } catch (err) {
            console.error('Erro ao enviar link:', err);
            setError('Erro ao enviar o link. Verifique o e-mail e tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-block">
                <div className="login-header">
                    <h1 className="login-title">IDENTIFICAÇÃO</h1>
                    <p className="login-subtitle">ACESSO AO SISTEMA TONARE</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {/* ── Tela inicial ── */}
                {step === 'initial' && (
                    <div className="login-actions">
                        <button
                            className="btn btn-primary btn-block btn-giant"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                        >
                            {isLoading ? 'AGUARDE...' : 'CONTINUAR COM GOOGLE'}
                        </button>

                        <div className="divider">
                            <span>OU</span>
                        </div>

                        <button
                            className="btn btn-outline btn-block"
                            onClick={() => setStep('email-input')}
                        >
                            <Mail size={18} style={{ marginRight: '10px' }} />
                            ENTRAR COM E-MAIL
                        </button>
                    </div>
                )}

                {/* ── Formulário de email ── */}
                {step === 'email-input' && (
                    <form onSubmit={handleEmailSubmit} className="login-form">
                        <div className="input-group">
                            <label className="mono-label">E-MAIL PROFISSIONAL</label>
                            <input
                                type="email"
                                className="input headline-input-small"
                                placeholder="SEU@EMAIL.COM"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>
                        <div className="login-hint">
                            Vamos enviar um link mágico para o seu e-mail. Sem senha!
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isLoading}
                        >
                            {isLoading ? 'ENVIANDO...' : 'ENVIAR LINK DE ACESSO'}
                        </button>
                        <button
                            type="button"
                            className="btn-link"
                            onClick={() => { setStep('initial'); setError(''); }}
                        >
                            VOLTAR
                        </button>
                    </form>
                )}

                {/* ── Link enviado ── */}
                {step === 'email-sent' && (
                    <div className="login-form" style={{ textAlign: 'center' }}>
                        <div className="email-sent-icon">
                            <CheckCircle size={56} strokeWidth={1.5} />
                        </div>
                        <h2 className="email-sent-title">LINK ENVIADO!</h2>
                        <p className="email-sent-desc">
                            Enviamos um link de acesso para<br />
                            <strong>{email}</strong>
                        </p>
                        <p className="email-sent-hint">
                            Abra o e-mail e clique no link para entrar.<br />
                            O link expira em 10 minutos.
                        </p>
                        <button
                            type="button"
                            className="btn-link"
                            onClick={() => { setStep('email-input'); setError(''); }}
                        >
                            USAR OUTRO E-MAIL
                        </button>
                    </div>
                )}

                {/* ── Completando login via magic link ── */}
                {step === 'completing' && (
                    <div className="login-form" style={{ textAlign: 'center' }}>
                        <div className="login-spinner" />
                        <p className="login-subtitle" style={{ marginTop: '2rem' }}>
                            VERIFICANDO ACESSO...
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
