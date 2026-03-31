import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Ensure we don't crash if env vars are missing during development
const isFirebaseConfigured = !!import.meta.env.VITE_FIREBASE_PROJECT_ID;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'dummy_api_key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'dummy.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://dummy.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'dummy_project',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

export { isFirebaseConfigured };
