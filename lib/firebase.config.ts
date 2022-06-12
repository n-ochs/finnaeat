/******************** IMPLEMENT FIREBASE RULES BEFORE PROD ********************/
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { DocumentData, DocumentReference, Firestore, doc, getFirestore } from 'firebase/firestore';

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

// Food Menu Ref
export const foodMenuRef: DocumentReference<DocumentData> = doc(db, 'menu', 'z6Lx7enScX1qtiNo7jDe');

// Business Details Ref
export const businessDetailsRef: DocumentReference<DocumentData> = doc(db, 'business-details', 'mfMcy5LzgM81ONbwlyJ9');
