import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                // Busca ou cria o perfil no Firestore
                await syncUserProfile(firebaseUser);
            } else {
                setUser(null);
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    /**
     * Sincroniza o usuário com o Firestore.
     * Se já existe um perfil, apenas atualiza o lastLogin.
     * Se não existe, cria um perfil básico com os dados do Firebase Auth.
     */
    const syncUserProfile = async (firebaseUser) => {
        try {
            const userRef = doc(db, 'users', firebaseUser.uid);
            const snap = await getDoc(userRef);

            if (snap.exists()) {
                // Usuário já cadastrado — atualiza último acesso
                await setDoc(userRef, { lastLogin: serverTimestamp() }, { merge: true });
                setUserProfile(snap.data());
            } else {
                // Primeiro login — cria perfil base
                const newProfile = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    displayName: firebaseUser.displayName || '',
                    photoURL: firebaseUser.photoURL || '',
                    provider: firebaseUser.providerData?.[0]?.providerId || 'email',
                    createdAt: serverTimestamp(),
                    lastLogin: serverTimestamp(),
                    role: null, // 'artist' | 'venue' — preenchido no onboarding
                    onboardingComplete: false,
                };
                await setDoc(userRef, newProfile);
                setUserProfile(newProfile);
            }
        } catch (error) {
            console.error('Erro ao sincronizar perfil no Firestore:', error);
            // Não bloqueia o login mesmo se o Firestore falhar
        }
    };

    /**
     * Atualiza campos do perfil do usuário no Firestore.
     */
    const updateUserProfile = async (data) => {
        if (!user) return;
        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, data, { merge: true });
            setUserProfile(prev => ({ ...prev, ...data }));
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            throw error;
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        setUserProfile(null);
    };

    const value = {
        user,
        userProfile,
        loading,
        logout,
        updateUserProfile,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth deve ser usado dentro de AuthProvider');
    }
    return context;
};
