import { FirebaseApp, getApp, initializeApp } from 'firebase/app';
import { Auth, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { FirebaseStorage, getStorage } from 'firebase/storage';

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
	projectId: process.env.REACT_APP_GOOGLE_PROJECT_ID,
	storageBucket: process.env.REACT_APP_GOOGLE_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_GOOGLE_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_GOOGLE_APP_ID
};

const createFirebaseApp: (config: FirebaseConfigType) => FirebaseApp = (config: FirebaseConfigType) => {
	try {
		return getApp();
	} catch {
		return initializeApp(config);
	}
};

const firebaseApp: FirebaseApp = createFirebaseApp(firebaseConfig);

// Auth exports
export const auth: Auth = getAuth(firebaseApp);
export const googleAuthProvider: GoogleAuthProvider = new GoogleAuthProvider();

// Firestore exports
export const firestore: Firestore = getFirestore(firebaseApp);

// Storage exports
export const storage: FirebaseStorage = getStorage(firebaseApp);
export const STATE_CHANGED: string = 'state_changed';
