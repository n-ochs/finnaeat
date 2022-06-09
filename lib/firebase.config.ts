/******************** IMPLEMENT FIREBASE RULES BEFORE PROD ********************/
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

type FirebaseConfigType = {
	apiKey: string;
	authDomain: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
};

const firebaseConfig: FirebaseConfigType = {
	apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID
};

// Initializing Firebase App
export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

// Initializing Firestore DB
export const db: Firestore = getFirestore(firebaseApp);

// Initializing Firebase Auth
export const auth: Auth = getAuth();
