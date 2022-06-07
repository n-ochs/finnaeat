/******************** IMPLEMENT FIREBASE RULES BEFORE PROD ********************/
import { FirebaseApp, initializeApp } from 'firebase/app';
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
	apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
	authDomain: process.env.REACT_APP_GOOGLE_AUTH_DOMAIN,
	projectId: 'finnaeat-74636',
	storageBucket: process.env.REACT_APP_GOOGLE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_GOOGLE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_GOOGLE_APP_ID
};

// Initializing Firebase App
export const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

// Initializing Firestore DB
export const db: Firestore = getFirestore(firebaseApp);
