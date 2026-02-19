import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute — redireciona para /login se não estiver autenticado.
 * Salva a rota tentada para redirecionar de volta após o login.
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        // Mostra um loading mínimo enquanto o Firebase verifica a sessão
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-background, #fff)'
            }}>
                <div style={{
                    width: 40,
                    height: 40,
                    border: '3px solid #eee',
                    borderTopColor: '#000',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redireciona para /login guardando a rota original
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
