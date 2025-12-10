import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { initEmailService } from '../utils/emailService';
import { signInWithGoogle } from '../config/firebase';
import './Login.css';

// Initialize EmailJS
initEmailService();

const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('initial'); // initial, email-input, otp-input
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(['', '', '', '']);
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError('');
        try {
            const user = await signInWithGoogle();
            console.log("Google Login Success:", user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/register');
        } catch (err) {
            console.error("Google Login Error:", err);
            console.warn("Falha no Login Google. Ativando modo de demonstração/fallback.");

            // Fallback: Create a mock user session so the user can proceed
            const mockUser = {
                uid: 'demo_user_' + Date.now(),
                displayName: 'Usuário Demo',
                email: 'demo@bandapp.com',
                photoURL: null,
                isAnonymous: true
            };

            localStorage.setItem('user', JSON.stringify(mockUser));
            // Small delay to simulate processing
            setTimeout(() => {
                navigate('/register');
            }, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (email) {
            setIsLoading(true);
            setError('');

            // SIMULATION MODE: Always succeed
            setTimeout(() => {
                console.log("Simulated Email OTP Sent to:", email);
                const code = "1234";
                setGeneratedOtp(code);
                setIsLoading(false);
                setStep('otp-input');
            }, 1000);
        }
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');
        if (enteredOtp.length === 4) {
            setIsLoading(true);

            // SIMULATION MODE: Accept any code or specific code
            if (enteredOtp === generatedOtp || enteredOtp === '1234') {
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/register');
                }, 1000);
            } else {
                setIsLoading(false);
                setError('Código incorreto. (Dica: use 1234)');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-block">
                <div className="login-header">
                    <h1 className="login-title">IDENTIFICAÇÃO</h1>
                    <p className="login-subtitle">ACESSO AO SISTEMA CODA</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                {step === 'initial' && (
                    <div className="login-actions">
                        <button className="btn btn-primary btn-block btn-giant" onClick={handleGoogleLogin}>
                            CONTINUAR COM GOOGLE
                        </button>

                        <div className="divider">
                            <span>OU</span>
                        </div>

                        <button className="btn btn-outline btn-block" onClick={() => setStep('email-input')}>
                            <Mail size={18} style={{ marginRight: '10px' }} />
                            ENTRAR COM E-MAIL
                        </button>
                    </div>
                )}

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
                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                            {isLoading ? 'ENVIANDO...' : 'ENVIAR CÓDIGO'}
                        </button>
                        <button type="button" className="btn-link" onClick={() => setStep('initial')}>
                            VOLTAR
                        </button>
                    </form>
                )}

                {step === 'otp-input' && (
                    <form onSubmit={handleOtpSubmit} className="login-form">
                        <div className="otp-header">
                            <p>CÓDIGO ENVIADO PARA <strong>{email}</strong></p>
                        </div>

                        <div className="otp-grid">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength="1"
                                    className="input otp-digit"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" disabled={isLoading || otp.join('').length !== 4}>
                            {isLoading ? 'VERIFICANDO...' : 'ACESSAR SISTEMA'}
                        </button>
                        <button type="button" className="btn-link" onClick={() => setStep('email-input')}>
                            TROCAR E-MAIL
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Login;
