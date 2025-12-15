import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Add declaration for window global
declare global {
    interface Window {
        FIREBASE_CUSTOM_TOKEN?: string;
    }
}

// Safe environment variable access
const getSafeEnv = (key: string, defaultValue: string = '') => {
    try {
        if (typeof process !== 'undefined' && process.env && process.env[key]) {
            return process.env[key];
        }
    } catch (e) {
        // ignore
    }
    return defaultValue;
}

const firebaseConfig = {
  apiKey: getSafeEnv('VITE_FIREBASE_API_KEY', "-"),
  authDomain: getSafeEnv('VITE_FIREBASE_AUTH_DOMAIN', "com"),
  projectId: getSafeEnv('VITE_FIREBASE_PROJECT_ID', ""),
  storageBucket: getSafeEnv('VITE_FIREBASE_STORAGE_BUCKET', "mr-..app"),
  messagingSenderId: getSafeEnv('VITE_FIREBASE_MESSAGING_SENDER_ID', ""),
  appId: getSafeEnv('VITE_FIREBASE_APP_ID', "1::web:"),
  measurementId: getSafeEnv('VITE_FIREBASE_MEASUREMENT_ID', "G-")
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Sandbox App ID
const PUBLIC_APP_ID = 'mr-daebak';

// Helper to construct the sandboxed path required by security rules
// Path format: /artifacts/{appId}/users/{userId}/{collectionName}
export const getScopedCollection = (uid: string, collectionName: string) => {
  const path = `artifacts/${PUBLIC_APP_ID}/users/${uid}/${collectionName}`;
  return collection(db, path);
};

export const getScopedProfilePath = (uid: string) => {
    return `artifacts/${PUBLIC_APP_ID}/users/${uid}/account/profile`;
}

export const getPublicCollection = (collectionName: string) => {
  const path = `artifacts/${PUBLIC_APP_ID}/public/data/${collectionName}`;
  return collection(db, path);
};

export const initializeAuthAndDB = async () => {
    if (window.FIREBASE_CUSTOM_TOKEN) {
        try {
            await signInWithCustomToken(auth, window.FIREBASE_CUSTOM_TOKEN);
        } catch (e) {
            console.error("Custom token auth failed", e);
        }
    }
    // Note: Anonymous auth fallback removed due to admin-restricted-operation policy
};
