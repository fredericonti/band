import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    sendSignInLinkToEmail,
    isSignInWithEmailLink,
    signInWithEmailLink,
    signOut
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// ─── Google Sign In ───────────────────────────────────────────────────────────
export const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
};

// ─── Email Magic Link (OTP via link) ─────────────────────────────────────────
// Configurações do link de email
const actionCodeSettings = {
    // URL para onde o usuário será redirecionado após clicar no link
    url: window.location.origin + '/login',
    handleCodeInApp: true,
};

export const sendEmailLoginLink = async (email) => {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // Salvar email no localStorage para usar na verificação
    window.localStorage.setItem('emailForSignIn', email);
};

export const completeEmailSignIn = async (email, emailLink) => {
    if (!isSignInWithEmailLink(auth, emailLink)) {
        throw new Error('Link inválido');
    }
    const result = await signInWithEmailLink(auth, email, emailLink);
    window.localStorage.removeItem('emailForSignIn');
    return result.user;
};

export const isEmailSignInLink = (link) => isSignInWithEmailLink(auth, link);

// ─── Sign Out ─────────────────────────────────────────────────────────────────
export const firebaseSignOut = async () => {
    await signOut(auth);
};
